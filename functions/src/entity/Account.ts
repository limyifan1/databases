import {
    Entity,
    BaseEntity,
    Column,
    PrimaryColumn,
  } from "typeorm";
  
  @Entity()
  export class Account extends BaseEntity {
    @PrimaryColumn()
    computingID: string;
    @Column()
    password: string;
    @Column()
    permission: string;
  }
  