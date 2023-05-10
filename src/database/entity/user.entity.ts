import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Question } from "./question.entity";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  auth0id!: string;

  @Column()
  name!: string;

  @OneToMany(() => Question, (question) => question.user)
  questions!: Question[];
}
