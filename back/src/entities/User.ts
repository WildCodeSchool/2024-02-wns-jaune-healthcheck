import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Url } from "./Url";

export enum Roles {
    ADMIN = "admin",
    FREE = "free",
    PREMIUM = "premium",
}

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

    @Field()
    @Column({
        type: "enum",
        enum: Roles, 
        default: Roles.FREE 
    })
    role: Roles;
}
