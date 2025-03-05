import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    BaseEntity,
    OneToOne,
    JoinColumn,
    Index,
} from "typeorm";
import { Url } from "./Url";
import { Notification } from "./Notification";
import { ObjectType, Field } from "type-graphql";
import PaginatesHistories from "@/types/PaginatesHistories";
import GroupByStatusHistory from "@/types/GroupByStatusHistory";

@Entity()
@ObjectType()
export class History extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field()
    @Index()
    @CreateDateColumn()
    created_at: Date;

    @Field()
    @Column()
    status_code: number;

    @Field()
    @Column("text")
    response: string;

    @Field()
    @Column({ length: 255 })
    content_type: string;

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
        const checkFrequency = url.checkFrequency?.interval;
        let conservedNumber: number;

        if (!checkFrequency) conservedNumber = 62;
        switch (checkFrequency) {
            case "Minute":
                conservedNumber = 1440; // 24 hours
                break;
            case "Heure":
                conservedNumber = 168; // 7 days
                break;
            case "Jour":
                conservedNumber = 62; // ~ 2 month
                break;
            case "Semaine":
                conservedNumber = 52; // ~ 1 year
                break;
            default:
                conservedNumber = 62;
        }

        const query = `
            id NOT IN (
                SELECT id FROM
                    (
                        (
                            SELECT id
                            FROM history 
                            WHERE urlId = :urlId 
                            ORDER BY created_at DESC 
                            LIMIT :conservedNumber
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
            .where(query, {
                conservedNumber: conservedNumber,
                urlId: url.id,
            })
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

        if (authenticatedUserId) {
            if (privateHistories === true) {
                whereConditions.push("user.id = :authenticatedUserId");
            } else if (privateHistories === false) {
                whereConditions.push("user.id IS NULL");
            } else {
                whereConditions.push(
                    "(user.id = :authenticatedUserId OR user.id IS NULL)",
                );
            }
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

    static async getGroupByStatusPrivateHistories(
        authenticatedUserId: string,
    ): Promise<GroupByStatusHistory[]> {
        const rawResults = await this.createQueryBuilder("history")
            .select("history.status_code", "statusCode")
            .addSelect(
                `SUM(CASE WHEN history.content_type LIKE 'application/json%' THEN 1 ELSE 0 END)`,
                "countJson",
            )
            .addSelect(
                `SUM(CASE WHEN history.content_type LIKE 'text/html%' THEN 1 ELSE 0 END)`,
                "countHtml",
            )
            .addSelect(
                `SUM(CASE WHEN history.content_type = 'unknown' THEN 1 ELSE 0 END)`,
                "countUnknown",
            )
            .innerJoin("history.url", "url")
            .where("url.userId = :userId", { userId: authenticatedUserId })
            .groupBy("history.status_code")
            .getRawMany();

        return rawResults.map((result) => ({
            statusCode: parseInt(result.statusCode, 0),
            countJson: parseInt(result.countJson, 0),
            countHtml: parseInt(result.countHtml, 0),
            countUnknown: parseInt(result.countUnknown, 0),
        }));
    }
}
