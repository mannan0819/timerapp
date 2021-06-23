import {
  Arg,
  Ctx,
  //   Field,
  //   FieldResolver,
  //   InputType,
  Int,
  Mutation,
  //   ObjectType,
  Query,
  Resolver,
  //   Root,
  //   UseMiddleware,
} from "type-graphql";
import { MyContext } from "../types";
// import { isAuth } from "../middleware/isAuth";
import { getConnection } from "typeorm";
// import { convertCompilerOptionsFromJson } from "typescript";
import { Projects } from "../entities/Projects";
import { ProjectInput } from "../utils/projectInput";
import { Timer } from "../entities/Timer";

@Resolver(Projects)
export class ProjectsResolver {
  @Query(() => String)
  hello() {
    return "hello from schema";
  }

  @Query(() => Projects, { nullable: true })
  Project(@Arg("id", () => Int) id: number): Promise<Projects | undefined> {
    return Projects.findOne(id);
  }

  @Query(() => [Projects])
  async Projects() {
    const projects = await getConnection().query(
      `
      select P.* from projects p Order By p."createdAt" DESC
      `
    );
    return projects;
  }

  @Mutation(() => Projects)
  //   @UseMiddleware(isAuth)
  async createProject(
    @Arg("input") input: ProjectInput
    // @Ctx() { req }: MyContext
  ) {
    return Projects.create({ ...input }).save();
  }

  @Mutation(() => Boolean)
  async deleteProjects(@Arg("id", () => Int) id: number): Promise<Boolean> {
    await Projects.delete(id);
    return true;
  }

  @Mutation(() => Projects, { nullable: true })
  async updateProjects(
    @Arg("id", () => Int) id: number,
    @Arg("title", () => String, { nullable: true }) title: string,
    @Arg("text", () => String, { nullable: true }) text: string,
    @Arg("colorhex", () => String, { nullable: true }) colorhex: string
  ): Promise<Projects | null> {
    let project = await Projects.findOne(id);
    if (!project) return null;
    if (typeof title !== "undefined" && typeof text !== "undefined") {
      await Projects.update({ id }, { title, text });
      project.title = title;
      project.text = text;
      project.colorhex = colorhex;
    } else if (typeof title !== "undefined") {
      await Projects.update({ id }, { title });
      project.title = title;
    } else if (typeof text !== "undefined") {
      await Projects.update({ id }, { text });
      project.text = text;
    } else if(typeof colorhex !== "undefined") {
      await Projects.update({ id }, { colorhex });
      project.colorhex = colorhex;
    }
    return project;
  }

  @Query(() => [Timer])
  async getTimers(@Arg("id", () => Int) id: number) {
    const projectTimers = await getConnection().query(
      `
      select t.*
      from Timer t
      where t."projectId" = $1
      order by t."createdAt" DESC
    `,
      [id]
    );
    return projectTimers;
  }
}
