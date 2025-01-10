import {
    Resolver,
    Query,
    Mutation,
    Arg,
    InputType,
    Field,
    Ctx,
} from "type-graphql";
import { Url } from "../entities/Url";
import { CheckFrequency } from "../entities/CheckFrequency";
import { validate } from "class-validator";
import { QueryFailedError } from "typeorm";
import MyContext from "../types/MyContext";
import PaginateUrls from "../types/PaginatesUrls";
import GroupByStatusUrl from "../types/GroupByStatusUrl";


@InputType()
export class UrlInput implements Partial<Url> {
    @Field()
    name: string;

    @Field()
    path: string;
}

@Resolver()
class UrlResolver {
    @Query(() => PaginateUrls)
    async urls(
        @Ctx() context: MyContext,
        @Arg("currentPage", { defaultValue: 1 }) currentPage: number,
        @Arg("searchText") searchText?: string,
        @Arg("sortField") sortField?: string,
        @Arg("privateUrls", { nullable: true }) privateUrls?: boolean,
    ): Promise<PaginateUrls> {
        try {
            if (context.payload) {
                return await Url.getPaginateUrls(
                    currentPage,
                    searchText,
                    sortField,
                    privateUrls,
                    context.payload.id,
                );
            }
            return await Url.getPaginateUrls(
                currentPage,
                searchText,
                sortField,
            );
        } catch (_error) {
            throw new Error("Internal server error");
        }
    }

    @Query(() => [GroupByStatusUrl])
    async privatesUrlsByStatus(
        @Ctx() context: MyContext,
        @Arg("timeFrame") timeFrame: "daily" | "hourly",
    ): Promise<GroupByStatusUrl[]> {
        try {
            if (context.payload) {
                switch (timeFrame) {
                    case "daily":
                        return await Url.getPrivatesUrlsByStatusDaily(context.payload.id);
                    case "hourly":
                        return await Url.getPrivatesUrlsByStatusHourly(context.payload.id);
                }
            }
            throw new Error();
        } catch (_error) {
            throw new Error("Internal server error");
        }
    }

    @Query(() => Number)
    async privateSumUrls(
        @Ctx() context: MyContext,
    ): Promise<number> {
        try {
            if (context.payload) {
                return await Url.countBy({
                    user: { id: context.payload.id }
                })
            }
            throw new Error();
        } catch (_error) {
            throw new Error("Internal server error");
        }
    }

    @Query(() => Url)
    async url(@Ctx() context: MyContext, @Arg("id") id: string): Promise<Url> {
        try {
            const queryBuilder = Url.createQueryBuilder("url")
                .leftJoinAndSelect("url.user", "user")
                .leftJoinAndSelect("url.histories", "histories")
                .where("url.id = :id", { id });

            if (context.payload) {
                queryBuilder.andWhere(
                    "(user.id = :userId OR user.id IS NULL)",
                    { userId: context.payload.id },
                );
            } else {
                queryBuilder.andWhere("user.id IS NULL");
            }

            const url = await queryBuilder.getOneOrFail();
            return url;
        } catch (error) {
            console.error("Erreur lors de la récupération de l'URL:", error);
            throw new Error("URL non trouvée ou accès non autorisé");
        }
    }

    @Query(() => [Url])
    async recentPrivateUrls(@Ctx() context: MyContext): Promise<Url[]> {
        try {
            if (context.payload) {
                return await Url.find({
                    order: { createdAt: "DESC" },
                    where: {
                        user: {
                            id: context.payload.id,
                        },
                    },
                    take: 5,
                });
            } else {
                throw new Error();
            }
        } catch (_error) {
            throw new Error("Internal server error");
        }
    }

    @Mutation(() => Url)
    async addUrl(
        @Ctx() context: MyContext,
        @Arg("urlData") urlData: UrlInput,
        @Arg("isPrivate", { defaultValue: false }) isPrivate: boolean,
        @Arg("checkFrequencyId", { nullable: true }) checkFrequencyId?: string,
    ): Promise<Url> {
        try {
            let url;

            if (context.payload && isPrivate) {
                if (!checkFrequencyId) {
                    const defaultFrequency = await CheckFrequency.findOneBy({
                        interval: "Jour",
                    });
                    if (defaultFrequency)
                        checkFrequencyId = defaultFrequency.id;
                }
                url = Url.create({
                    ...urlData,
                    path: encodeURI(urlData.path),
                    user: { id: context.payload.id },
                    checkFrequency: { id: checkFrequencyId },
                });
            } else {
                url = Url.create({ ...urlData, path: encodeURI(urlData.path) });
            }

            const dataValidationError = await validate(url);
            if (dataValidationError.length > 0) {
                throw new Error("Data validation error");
            }

            await url.save();
            return url;
        } catch (error) {
            if (error instanceof QueryFailedError) {
                throw new Error(
                    "Erreur lors de l'ajout de l'url dans la base de données",
                );
            }
            if (error.message === "Data validation error") {
                throw new Error(
                    "Erreur de validation des données, l'url doit comporter un chemin valide ex: http(s)://...",
                );
            }
            throw new Error("Internal server error");
        }
    }

    @Mutation(() => Url)
    async checkUrl(@Arg("id") id: string): Promise<Url> {
        try {
            const url = await Url.findOneByOrFail({ id });

            url.lastCheckDate = new Date();
            await url.save();

            return url;
        } catch (error) {
            if (error.name === "EntityNotFound") {
                throw new Error("URL not found");
            }
            throw new Error("Internal server error");
        }
    }
}

export default UrlResolver;
