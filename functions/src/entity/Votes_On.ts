import {
  Entity,
  BaseEntity,
  Column,
  PrimaryColumn,
} from "typeorm";

@Entity()
export class Votes_On extends BaseEntity {
  @PrimaryColumn()
  studentComputingID: string;

  @Column()
  professorComputingID: string;

  @Column()
  voteValue: number;
}
