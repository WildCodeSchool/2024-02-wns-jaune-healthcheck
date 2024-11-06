import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Url } from "./Url";
import { Notification } from "./Notification";

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field()
    @Column({ unique: true })
    username: string;

    @Field()
    @Column({ unique: true })
    email: string;

    @Column()
    hashedPassword: string;

    @Field(() => [Url], { nullable: true })
    @OneToMany(() => Url, (Url) => Url.user)
    urls!: Url[];

    @Field(() => [Notification])
    @OneToMany(() => Notification, (notification) => notification.user, {
        eager: true,
    })
    notifications: Notification[];
}
