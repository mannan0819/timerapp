import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { createConnection } from "typeorm";
import { Read } from "./entities/Read";
import { ReadResolver } from "./resolvers/read";
import { User } from "./entities/User";
import { Timer } from "./entities/Timer";
import { UserResolver } from "./resolvers/user";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import { __prod__ } from "./constants";
import path from "path";
import cors from "cors";
import { TimerResolver } from "./resolvers/timer";
import { Projects } from "./entities/Projects";
import { ProjectsResolver } from "./resolvers/projects";

const RedisStore = connectRedis(session);

const redis = new Redis();

const main = async () => {
  const app = express();
  const port = 5000;
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  const conn = await createConnection({
    type: "postgres",
    username: "postgres",
    password: "postgres",
    database: "timerapp",
    logging: !__prod__,
    entities: [Read, User, Timer, Projects],
    // migrations: [path.join(__dirname, "/migrations/*")],
    synchronize: true,
  });
  // conn.runMigrations();
  console.log(conn.isConnected);
  //await Timer.delete({});
  app.use(
    session({
      name: "qid",
      store: new RedisStore({ client: redis, disableTouch: true }),
      secret: "jklkjlk43#@$#WSAFK@L#@349vi@#xc$*(!@leio0i#sadfj$%KJWEMD$",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
        httpOnly: true,
        secure: __prod__,
        sameSite: "lax",
      },
    })
  );

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        HelloResolver,
        ReadResolver,
        UserResolver,
        TimerResolver,
        ProjectsResolver,
      ],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res, redis }),
  });

  server.applyMiddleware({
    app,
    cors: false,
  });

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
};

main();
