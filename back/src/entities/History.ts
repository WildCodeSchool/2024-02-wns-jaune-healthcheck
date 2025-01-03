import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    BaseEntity,
    OneToOne,
    JoinColumn,
} from "typeorm";
import { Url } from "./Url";
import { Notification } from "./Notification";
import { ObjectType, Field } from "type-graphql";
import PaginatesHistories from "@/types/PaginatesHistories";

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

    @OneToOne(() => Notification, (notification) => notification.history, {
        nullable: true,
        onDelete: "CASCADE",
    })
    @JoinColumn()
    notification?: Notification | null;

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
                            LIMIT 29
                        )

                        UNION

                        (
                            SELECT id
                            FROM history
                            WHERE urlId = :urlId 
                            AND response != ''
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

    static async getPaginateHistories(
        currentPage: number,
        searchText?: string,
        sortField?: string,
        privateHistories?: boolean,
        authenticatedUserId?: string,
        urlId?: string,
    ): Promise<PaginatesHistories> {
        const skip = (currentPage - 1) * 16;
        const queryBuilder = this.createQueryBuilder("history")
            .innerJoinAndSelect("history.url", "url")
            .leftJoinAndSelect("url.user", "user");

        const whereConditions: string[] = ["1 = 1"];

        if (privateHistories === undefined && authenticatedUserId) {
            whereConditions.push(
                "(user.id = :authenticatedUserId OR user.id IS NULL)",
            );
        } else if (privateHistories && authenticatedUserId) {
            whereConditions.push("user.id = :authenticatedUserId");
        } else {
            whereConditions.push("user.id IS NULL");
        }

        if (searchText) {
            whereConditions.push("url.name ILIKE :searchText");
        }
        if (urlId) {
            whereConditions.push("url.id = :urlId");
        }

        queryBuilder.where(whereConditions.join(" AND "), {
            searchText: `%${searchText}%`,
            authenticatedUserId: authenticatedUserId,
            urlId: urlId,
        });

        if (sortField) {
            if (sortField === "status") {
                queryBuilder.orderBy("history.status_code", "ASC");
            } else if (sortField === "name") {
                queryBuilder.orderBy("url.name", "ASC");
            } else if (sortField === "created_at") {
                queryBuilder.orderBy("history.created_at", "DESC");
            }
        } else {
            queryBuilder.orderBy("history.created_at", "DESC");
        }

        const [histories, total] = await queryBuilder
            .skip(skip)
            .take(16)
            .getManyAndCount();

        return {
            histories: histories,
            totalPages: Math.ceil(total / 16),
            currentPage: currentPage,
            previousPage: Math.max(currentPage - 1, 1),
            nextPage: Math.min(currentPage + 1, Math.ceil(total / 16)),
        };
    }
}
