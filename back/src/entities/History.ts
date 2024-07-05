import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    BaseEntity,
} from "typeorm";
import { Url } from "./Url";
import { ObjectType, Field } from "type-graphql";

@Entity()
@ObjectType()
export class History extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field()
    @CreateDateColumn()
    created_at: Date;

    @Field()
    @Column()
    status_code: number;

    @Field()
    @Column("text")
    response: string;

    @Field(() => Url)
    @ManyToOne(() => Url, (url) => url.histories)
    url: Url;
}
