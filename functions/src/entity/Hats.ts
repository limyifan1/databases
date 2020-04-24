import { Hippo } from './Hippo'
import { Entity, PrimaryGeneratedColumn, ManyToOne, BaseEntity } from 'typeorm';

@Entity()
export class Hat extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Hippo, hippo => hippo.hats)
    owner: Hippo;
}
