import {
  Entity,
  BaseEntity,
  Column,
  PrimaryColumn,
} from "typeorm";

@Entity()
export class Professor extends BaseEntity {
  @PrimaryColumn()
  computingID: string;

  @Column()
  score: number;

  @Column()
  numVotes: number;

  @Column()
  salary: number;

  @Column()
  tenure: number;

  @Column()
  dName: string;
}
