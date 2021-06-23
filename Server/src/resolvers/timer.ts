import { validateTimerInput } from "../utils/validate";
import {
  Arg,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Timer } from "../entities/Timer";
import { TimerInput, TimerResponse } from "../utils/timerInput";
import { getConnection } from "typeorm";
import { Projects } from "../entities/Projects";

// @ObjectType()
// class Paginatedtimers {
//   @Field(() => [Timers])
//   timer: Timers[];
//   @Field()
//   hasMore: boolean;
// }

@Resolver(Timer)
export class TimerResolver {
  @FieldResolver(() => Number)
  clocktimer(@Root() timer: Timer) {
    if (!timer.endtime) return 0;
    return ((timer.endtime as any) - (timer.starttime as any)) / 1000;
    // read.text.slice(0, 50);
  }
  @Query(() => String)
  hello() {
    return "hello from schema";
  }

  @Mutation(() => Timer, { nullable: true })
  Timer(@Arg("id", () => Int) id: number): Promise<Timer | undefined> {
    return Timer.findOne(id);
  }

  @Query(() => [Timer])
  async Timers() {
    // const timeAll = await getConnection().query(

    //   select t.*,
    //   from Timer t
    //   order by t."createdAt" DESC
    // `
    // );
    // return timeAll;
    return await Timer.find({ order: { createdAt: "DESC" } });
  }

  @Mutation(() => TimerResponse)
  //   @UseMiddleware(isAuth)
  async createTimer(
    @Arg("timerinput") input: TimerInput
  ): Promise<TimerResponse> {
    const error = validateTimerInput(input);
    if (error) return { error };
    try {
      const project = await Projects.findOne(input.projectId);
      if (!project)
        return {
          error: [{ field: "project", message: "Project doesnt exist" }],
        };
      const timer = new Timer();
      timer.title = input.title;
      timer.text = input.text;
      timer.projectId = input.projectId;
      timer.starttime = input.starttime;
      timer.complete = input.complete;
      timer.project = project;
      await getConnection().manager.save(timer);
      // const timer = await Timer.create({ ...input }).save();
      return { timer };
    } catch (e) {
      console.log(e);
      return {};
    }
  }

  @Mutation(() => Boolean)
  async changeProject(
    @Arg("id", () => Int) id: number,
    @Arg("projectid", () => Int) projectid: number
  ) {
    try {
      const project = await Projects.findOne(projectid);
      const timer = await Timer.findOne(id);
      if (!project)
        return {
          error: [{ field: "project", message: "Project doesnt exist" }],
        };
      if (!timer)
        return {
          error: [{ field: "timer", message: "Timer doesnt exist" }],
        };
      timer.projectId = projectid;
      timer.project = project;
      await getConnection().manager.save(timer);
      console.log("TIMERID: ", timer.id);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  @Mutation(() => Timer)
  async endTimer(@Arg("id", () => Int) id: number) {
    let timer = await Timer.findOne(id);
    if (!timer) return null;
    if (!timer.complete) {
      timer.complete = true;
      timer.endtime = new Date();
    }
    await Timer.save(timer);
    return timer;
  }

  @Mutation(() => Boolean)
  async deleteTimer(@Arg("id", () => Int) id: number) {
    await Timer.delete(id);
    return true;
  }
}
