import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Projects } from "./Projects";

@ObjectType()
@Entity()
export class Timer extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  text!: string;

  @Field()
  @Column()
  starttime!: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  endtime: Date;

  @Field()
  @Column()
  complete!: boolean;

  @Field()
  @Column()
  projectId!: number;

  @Field()
  @ManyToOne(() => Projects, (projects: Projects) => projects.timers, {
    nullable: false,
    eager: true,
  })
  project: Projects;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
