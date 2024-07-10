import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";

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
}
