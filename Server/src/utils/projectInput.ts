import { Field, InputType, ObjectType } from "type-graphql";
import { FieldError } from "./UsernamePasswordInput";
import { Projects } from "../entities/Projects";

@InputType()
export class ProjectInput {
  @Field()
  title: string;
  @Field()
  text: string;
  @Field()
  colorhex: string;
}

@ObjectType()
export class ProjectResponse {
  @Field(() => [FieldError], { nullable: true })
  error?: FieldError[];

  @Field(() => Projects, { nullable: true })
  project?: Projects;
}
