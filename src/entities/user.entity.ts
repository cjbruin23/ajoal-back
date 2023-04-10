import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn({ type: 'string', length: 20 })
  id: string;

  @Column({ type: 'string' })
  fullname: string;
}
