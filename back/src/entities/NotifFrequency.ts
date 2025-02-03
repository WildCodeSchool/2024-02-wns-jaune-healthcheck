import { Field, ObjectType } from "type-graphql";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
@ObjectType()
export class NotifFrequency extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field()
    @Column()
    interval: string;

    @Field()
    @CreateDateColumn()
    created_at: Date;

    @Field(() => [User])
    @OneToMany(() => User, (user) => user.notifFrequency)
    users: User[];
}
