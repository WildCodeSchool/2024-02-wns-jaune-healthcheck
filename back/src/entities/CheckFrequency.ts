import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { Url } from "./Url";
import { ObjectType, Field } from "type-graphql";

@Entity()
@ObjectType()
export class CheckFrequency extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  interval: string;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field(() => [Url])
  @OneToMany(() => Url, (url) => url.checkFrequency)
  urls: Url[];
}