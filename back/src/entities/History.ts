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

    static async deleteOldHistoriesByUrl(url: Url) {
        const query = `
            id NOT IN (
                SELECT id FROM
                    (
                        (
                            SELECT id
                            FROM history 
                            WHERE urlId = :urlId 
                            ORDER BY created_at DESC 
                            LIMIT 1
                        )

                        UNION

                        (
                            SELECT id
                            FROM history
                            WHERE urlId = :urlId 
                            AND status_code = 200 AND response != ''
                        )
                    ) AS conserved_ids
                ) 
                AND urlId = :urlId
        `;
        return this.createQueryBuilder("history")
            .delete()
            .where(query, { urlId: url.id })
            .execute();
    }
}
