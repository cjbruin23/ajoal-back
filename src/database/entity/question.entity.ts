import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({ name: "question" })
export class Question {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 80, nullable: false })
  title!: string;

  @Column({ type: "varchar", length: 1000, nullable: false })
  body!: string;

  @Column()
  keywords!: string;

  @ManyToOne(() => User, (user) => user.questions)
  user!: User;
}
