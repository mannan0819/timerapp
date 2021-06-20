import { Read } from "../entities/Read";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { MyContext } from "../types";
import { isAuth } from "../middleware/isAuth";
import { getConnection } from "typeorm";
import { read } from "fs";
import { convertCompilerOptionsFromJson } from "typescript";

@ObjectType()
class PaginatedReads {
  @Field(() => [Read])
  reads: Read[];
  @Field()
  hasMore: boolean;
}

@InputType()
class ReadInput {
  @Field()
  title: string;
  @Field()
  text: string;
}

@Resolver(Read)
export class ReadResolver {
  @Query(() => String)
  hello() {
    return "hello from schema";
  }

  @FieldResolver(() => String)
  textSnippet(@Root() read: Read) {
    return read.text.slice(0, 50);
  }

  @Query(() => Read, { nullable: true })
  Read(@Arg("id") id: number): Promise<Read | undefined> {
    return Read.findOne(id);
  }

  @Query(() => PaginatedReads)
  async Reads(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedReads> {
    const realLimit = Math.min(limit, 50);
    const realLimitPlusOne = realLimit + 1;
    const replacement: any[] = [realLimitPlusOne];
    if (cursor) {
      replacement.push(new Date(cursor));
    }

    const reads = await getConnection().query(
      `
      select r.*,
      json_build_object(
        'username', u.username,
        'email', u.email,
        'id', u.id) creator
      from read r
      inner join "user" u on u.id = r."creatorId"
      ${cursor ? `where r."createdAt" < $2` : ""}
      order by r."createdAt" DESC
      limit $1
    `,
      replacement
    );
    // const qb = getConnection()
    //   .getRepository(Read)
    //   .createQueryBuilder("read")
    //   .take(realLimitPlusOne)
    //   .orderBy('"createdAt"', "DESC");

    // if (cursor) {
    //   qb.where('"createdAt" < :cursor', { cursor: new Date(cursor) });
    // }

    // const reads = await qb.getMany();
    // console.log("read.length: " + reads.length);
    return {
      reads: reads.slice(0, realLimit),
      hasMore: reads.length === realLimitPlusOne,
    };

    // const reads = await getConnection()
    //   .getRepository(Read)
    //   .createQueryBuilder("Read")
    //   .orderBy('"createdAt"', "DESC")
    //   .take(limit);

    // if (cursor) {
    //   reads.where('"createdAt" < :cursor', {
    //     new Date(cursor),
    //   });
    // }
    // return reads.getMany();
    // return Read.find();
  }

  @Mutation(() => Read)
  @UseMiddleware(isAuth)
  async createRead(@Arg("input") input: ReadInput, @Ctx() { req }: MyContext) {
    return Read.create({ ...input, creatorId: req.session.userid }).save();
  }

  @Mutation(() => Boolean)
  async deleteRead(@Arg("id") id: number): Promise<Boolean> {
    await Read.delete(id);
    return true;
  }

  @Mutation(() => Read, { nullable: true })
  async updateRead(
    @Arg("id") id: number,
    @Arg("title", () => String, { nullable: true }) title: string,
    @Arg("text", () => String, { nullable: true }) text: string
  ): Promise<Read | null> {
    let read = await Read.findOne(id);
    if (!read) return null;
    if (typeof title !== "undefined" && typeof text !== "undefined") {
      await Read.update({ id }, { title, text });
      read.title = title;
      read.text = text;
    } else if (typeof title !== "undefined") {
      await Read.update({ id }, { title });
      read.title = title;
    } else if (typeof text !== "undefined") {
      await Read.update({ id }, { text });
      read.text = text;
    }
    return read;
  }
}
