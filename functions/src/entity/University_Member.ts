import {
  Entity,
  BaseEntity,
  Column,
  PrimaryColumn,
} from "typeorm";

@Entity()
export class UniversityMember extends BaseEntity {
  @PrimaryColumn()
  computingID: string;

  @Column()
  firstName: string;

  @Column()
  middleName: string;

  @Column()
  lastName: string;

  @Column()
  gender: string;

  @Column()
  age: number;
}
