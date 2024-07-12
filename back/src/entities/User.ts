import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { UserUrl } from "./UserUrl";

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

    @Field(() => [UserUrl])
    @OneToMany(() => UserUrl, (userUrl) => userUrl.user)
    userUrls!: UserUrl[];
}
