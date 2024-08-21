import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    OneToMany,
    OneToOne,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { IsUrl, Length } from "class-validator";
import { History } from "./History";
import { UserUrl } from "./UserUrl";
import PaginateUrls from "../types/PaginatesUrls";


@Entity()
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
        },
    )
    path: string;

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => Date)
    @CreateDateColumn()
    lastCheckDate: Date;

    @Field(() => [History])
    @OneToMany(() => History, (history) => history.url, { eager: true })
    histories: History[];

    @Field(() => UserUrl, { nullable: true })
    @OneToOne(() => UserUrl, (userUrl) => userUrl.url, { eager: true })
    userUrl?: UserUrl;

    static async getPaginateUrls(
        currentPage: number, 
        searchText?: string,
        sortField?: string,
        privateUrls?: boolean,
        authenticatedUserId?: string
    ): Promise<PaginateUrls> {
        const skip = (currentPage - 1) * 16;
        const queryBuilder = this.createQueryBuilder("url")
            .innerJoinAndSelect("url.histories", "history")
            .leftJoinAndSelect("url.userUrl", "userUrl")
    
        const whereConditions: string[] = ["1 = 1"];

        if (privateUrls && authenticatedUserId) {
            whereConditions.push("userUrl.id = :authenticatedUserId");
        } else {
            whereConditions.push("userUrl.id IS NULL");
        }
    
        if (searchText) {
            whereConditions.push("(url.name ILIKE :searchText OR url.path ILIKE :searchText)");
        }
    
        queryBuilder.where(whereConditions.join(" AND "), { 
            searchText: `%${searchText}%`,
            authenticatedUserId: authenticatedUserId
        });

        if (sortField) {
            if (sortField === "status") {
                queryBuilder.addSelect((subQuery) => {
                    return subQuery
                        .select('history.status_code')
                        .from(History, 'history')
                        .where('history.urlId = url.id')
                        .orderBy('history.created_at', 'DESC')
                        .limit(1);
                    }, 'lateststatus')
                    .orderBy('lateststatus', 'ASC')
            } else if (sortField === "name") {
                queryBuilder.orderBy("url.name", "ASC");
            } 
            else if (sortField === "createdAt") {
                queryBuilder.orderBy("url.createdAt", "DESC");
            }
        } else {
            queryBuilder.orderBy("url.createdAt", "DESC");
        }

        queryBuilder.skip(skip).take(16);
        
        const [urls, countUrls] = await queryBuilder.getManyAndCount();
        const totalPages: number = Math.ceil(countUrls / 16);

        return {
            urls: urls,
            totalPages: totalPages,
            currentPage: currentPage,
            previousPage: Math.max(currentPage - 1, 0),
            nextPage: Math.min(currentPage + 1, totalPages),
        };
    }
}
