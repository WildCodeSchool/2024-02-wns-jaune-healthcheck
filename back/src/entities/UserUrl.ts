import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { User } from "./User";
import { Url } from "./Url";

@ObjectType()
@Entity()
export class UserUrl extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field()
    @Column()
    userId!: string;

    @Field()
    @Column()
    urlId!: string;

    @ManyToOne(() => User, (user) => user.userUrls)
    @JoinColumn({ name: "userId" })
    user!: User;

    @OneToOne(() => Url, (url) => url.userUrl)
    @JoinColumn({ name: "urlId" })
    url!: Url;

    @Field()
    @CreateDateColumn()
    createdAt: Date;
}
