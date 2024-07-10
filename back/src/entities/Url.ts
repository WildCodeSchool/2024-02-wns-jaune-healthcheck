import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    OneToMany,
    Unique,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { IsUrl, Length } from "class-validator";
import { History } from "./History";

@Entity()
@Unique(["path"])
@ObjectType()
export class Url extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field()
    @Column({ length: 55 })
    @Length(1, 55, {
        message: "Le nom est requis et maximum 55 caractères",
    })
    name: string;

    @Field()
    @Column()
    @IsUrl(
        { require_protocol: true },
        {
            message: "Le chemin doit être une URL valide",
        }
    )
    path: string;

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => [History])
    @OneToMany(() => History, (history) => history.url, { eager: true })
    histories: History[];
}
