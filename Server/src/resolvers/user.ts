import { User } from "../entities/User";
import {
  UsernamePasswordInput,
  UserResponse,
} from "../utils/UsernamePasswordInput";
import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import argon2 from "argon2";
import { passwordValidate, validateUserInput } from "../utils/validate";
import { MyContext } from "../types";
import { COOKIE_NAME, FORGOTPASSKEY, HOME_URL } from "../constants";
import { mailer } from "../utils/mailer";
import { v4 } from "uuid";

@Resolver(User)
export class UserResolver {
  @FieldResolver(() => String)
  email(@Root() user: User, @Ctx() { req }: MyContext) {
    if (req.session.userid === user.id) {
      return user.email;
    }
    return "";
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext) {
    if (req.session.userid) {
      const usrid = req.session.userid;
      const user = await User.findOne(usrid);
      return user;
    }
    return null;
  }

  @Query(() => User, { nullable: true })
  User(@Arg("id") id: number): Promise<User | undefined> {
    return User.findOne(id);
  }

  @Query(() => [User])
  Users() {
    return User.find();
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options") input: UsernamePasswordInput
  ): Promise<UserResponse> {
    console.log(input);
    const error = validateUserInput(input);
    console.log("ERROR IS: " + error);
    if (error) return { error };
    input.password = await argon2.hash(input.password);
    try {
      const user = await User.create({ ...input }).save();
      return { user };
    } catch (error) {
      if (error.message.includes("duplicate")) {
        return {
          error: [
            {
              field: "username",
              message: "Duplicate username",
            },
          ],
        };
      } else {
        return {
          error: [
            {
              field: "unknown",
              message: "unknown error",
            },
          ],
        };
      }
    }
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() { req, redis }: MyContext
  ) {
    const usr = await User.findOne({ where: { email } });
    if (!usr) {
      return false;
    }
    const key = v4();
    await redis.set(FORGOTPASSKEY + key, usr.id, "ex", 1000 * 60 * 60 * 24 * 3);
    mailer(
      email,
      `<a href="${HOME_URL}change-password/${key}">reset password</a>`
    );
    return true;
  }

  @Mutation(() => UserResponse)
  async changePassword(
    @Arg("oldpassword") oldpassword: string,
    @Arg("newpassword") newpassword: string,
    @Arg("token") token: String,
    @Ctx() { req, redis }: MyContext
  ): Promise<UserResponse> {
    const id = await redis.get(FORGOTPASSKEY + token);
    if (id) {
      const user = await User.findOne(id);
      if (user && (await argon2.verify(user.password, oldpassword))) {
        const error = passwordValidate("newpassword", newpassword);
        if (error) return { error };
        const hashPassword = await argon2.hash(newpassword);
        user.password = hashPassword;
        await User.save(user);
        // await redis.del(FORGOTPASSKEY + token);
        req.session.userid = user.id;
        return { user };
      }
      return {
        error: [
          {
            field: "oldpassword",
            message: "miss matching password",
          },
        ],
      };
    } else {
      return {
        error: [
          {
            field: "token",
            message: "TOKEN EXPIRED",
          },
        ],
      };
    }
  }

  @Mutation(() => UserResponse)
  async Login(
    @Arg("username") username: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const usr = await User.findOne({ where: { username } });

    if (!usr) {
      return {
        error: [
          {
            field: "username",
            message: "This user does not exist.",
          },
        ],
      };
    }
    if (await argon2.verify(usr.password, password)) {
      console.log(usr.id);
      req.session.userid = usr.id;
      return { user: usr };
    }
    return {
      error: [
        {
          field: "password",
          message: "password is incorrect.",
        },
      ],
    };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    console.log("HERERR");
    return new Promise((resolve) =>
      req.session.destroy((err: any) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }
        resolve(true);
      })
    );
  }
}
