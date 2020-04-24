import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  BeforeInsert,
} from "typeorm";
import { Hat } from "./Hats";

@Entity()
export class Hippo extends BaseEntity {
  @Column()
  name: string;

  @Column()
  weight: number;

  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany((type) => Hat, (hat) => hat.owner)
  hats: Hat[];

  @Column()
  createdAt: Date;

  @BeforeInsert()
  addTimestamp() {
    this.createdAt = new Date();
  }
}
