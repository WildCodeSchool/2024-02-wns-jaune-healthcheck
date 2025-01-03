import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    BaseEntity,
    OneToOne,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { User } from "./User";
import { History } from "./History";

@Entity()
@ObjectType()
export class Notification extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field()
    @CreateDateColumn()
    created_at: Date;

    @Field()
    @Column()
    is_read: boolean;

    @Field()
    @Column("text")
    content: string;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.notifications)
    user: User;

    @OneToOne(() => History, (history) => history.notification)
    history: History;
}
