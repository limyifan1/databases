import {
  Entity,
  BaseEntity,
  Column,
  PrimaryColumn,
} from "typeorm";

@Entity()
export class Has_Taken extends BaseEntity {
  @PrimaryColumn()
  studentComputingID: string;

  @Column()
  cid: string;
}
