import { Timer } from "../entities/Timer";
import { Field, InputType, ObjectType } from "type-graphql";
import { FieldError } from "./UsernamePasswordInput";

@InputType()
export class TimerInput {
  @Field()
  title: string;
  @Field()
  text: string;
  @Field()
  projectId: number;
  @Field()
  starttime: Date;
  @Field()
  complete: boolean;
}

// @ObjectType()
// export class TimerFieldError {
//   @Field()
//   field: String;

//   @Field()
//   message: String;
// }

@ObjectType()
export class TimerResponse {
  @Field(() => [FieldError], { nullable: true })
  error?: FieldError[];

  @Field(() => Timer, { nullable: true })
  timer?: Timer;
}
