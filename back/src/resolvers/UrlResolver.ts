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
import { History } from "../entities/History";
import { CheckFrequency } from "../entities/CheckFrequency";
import { validate } from "class-validator";
import { QueryFailedError } from "typeorm";
import MyContext from "../types/MyContext";
import PaginateUrls from "../types/PaginatesUrls";
import GroupByStatusUrl from "../types/GroupByStatusUrl";
import dataSource from "../database/dataSource";
import { Roles, User } from "../entities/User";

@InputType()
export class UrlInput implements Partial<Url> {
    @Field()
    name: string;

    @Field()
    path: string;
}

@Resolver()
class UrlResolver {
    private async verifyUserLimit(userId: string, userRole: string) {
        const freeLimit: number = 5;
        const tierLitit: number = 10;

        const countPrivateUrls: number = await Url.countBy({
            user: { id: userId },
            private: true,
        });

        if (userRole === Roles.FREE) {
            return countPrivateUrls >= freeLimit;
        } else if (userRole === Roles.TIER) {
            return countPrivateUrls >= tierLitit;
        } else {
            return false;
        }
    }

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
        } catch (error) {
            console.error(`[ERROR] : ${error}`);
            throw new Error("Erreur interne, veuillez réessayer.");
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
                        return await Url.getPrivatesUrlsByStatusDaily(
                            context.payload.id,
                        );
                    case "hourly":
                        return await Url.getPrivatesUrlsByStatusHourly(
                            context.payload.id,
                        );
                }
            } else {
                throw new Error("Utilisateur non authentifié");
            }
        } catch (error) {
            console.error(`[ERROR] : ${error}`);
            if (error.message === "Utilisateur non authentifié") {
                throw new Error("Utilisateur non authentifié.");
            } else {
                throw new Error("Erreur interne, veuillez réessayer.");
            }
        }
    }

    @Query(() => Number)
    async privateSumUrls(@Ctx() context: MyContext): Promise<number> {
        try {
            if (context.payload) {
                return await Url.countBy({
                    user: { id: context.payload.id },
                    private: true,
                });
            } else {
                throw new Error("Utilisateur non authentifié");
            }
        } catch (error) {
            console.error(`[ERROR] : ${error}`);
            if (error.message === "Utilisateur non authentifié") {
                throw new Error("Utilisateur non authentifié.");
            } else {
                throw new Error("Erreur interne, veuillez réessayer.");
            }
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
            console.error(`[ERROR] : ${error}`);
            throw new Error("URL non trouvée.");
        }
    }

    @Query(() => [Url])
    async recentPrivateUrls(@Ctx() context: MyContext): Promise<Url[]> {
        try {
            if (context.payload) {
                return await dataSource
                    .createQueryBuilder(Url, "url")
                    .innerJoinAndSelect("url.histories", "histories")
                    .innerJoin("url.user", "user")
                    .where("user.id = :userId", { userId: context.payload.id })
                    .andWhere("url.private = true")
                    .orderBy("url.createdAt", "DESC")
                    .take(5)
                    .cache(true)
                    .getMany();
            } else {
                throw new Error("Utilisateur non authentifié");
            }
        } catch (error) {
            console.error(`[ERROR] : ${error}`);
            if (error.message === "Utilisateur non authentifié") {
                throw new Error("Utilisateur non authentifié.");
            } else {
                throw new Error("Erreur interne, veuillez réessayer.");
            }
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
                const user: User = await User.findOneByOrFail({
                    id: context.payload.id,
                });
                const userRole: string = user!.role;

                const limitReached: boolean = await this.verifyUserLimit(
                    user.id,
                    userRole,
                );

                if (limitReached) {
                    throw new Error("Erreur de limitation des données");
                }

                if (!checkFrequencyId || userRole !== Roles.PREMIUM) {
                    const defaultFrequency = await CheckFrequency.findOneBy({
                        interval: "Jour",
                    });
                    if (defaultFrequency) {
                        checkFrequencyId = defaultFrequency.id;
                    }
                }
                url = Url.create({
                    ...urlData,
                    path: encodeURI(urlData.path),
                    private: isPrivate,
                    user: { id: context.payload.id },
                    checkFrequency: { id: checkFrequencyId },
                });
            } else {
                url = Url.create({
                    ...urlData,
                    path: encodeURI(urlData.path),
                    private: false,
                });
            }

            const dataValidationError = await validate(url);
            if (dataValidationError.length > 0) {
                throw new Error("Erreur de validation des données");
            }

            await url.save();
            return url;
        } catch (error) {
            console.error(`[ERROR] : ${error}`);
            if (error instanceof QueryFailedError) {
                throw new Error(
                    "Erreur lors de l'ajout de l'url dans la base de données.",
                );
            }
            if (error.message === "Erreur de validation des données") {
                throw new Error(
                    "Erreur de validation des données, l'url doit comporter un chemin valide ex: http(s)://...",
                );
            }
            if (error.message === "Erreur de limitation des données") {
                throw new Error("La limite de l'abonnement a été atteinte.");
            }
            throw new Error("Erreur interne, veuillez réessayer.");
        }
    }

    @Mutation(() => Url)
    async checkUrl(@Arg("id") id: string): Promise<Url> {
        try {
            const url = await Url.findOneByOrFail({ id });
            const userRole: string = url.user!.role;

            if (userRole === Roles.PREMIUM) {
                url.lastCheckDate = new Date();
                await url.save();

                return url;
            } else {
                throw new Error("Utilisateur non authorisé");
            }
        } catch (error) {
            console.error(`[ERROR] : ${error}`);
            if (error.name === "EntityNotFound") {
                throw new Error("URL non trouvée.");
            }
            if (error.message === "Utilisateur non authorisé") {
                throw new Error("Utilisateur non authorisé.");
            } else {
                throw new Error("Erreur interne, veuillez réessayer.");
            }
        }
    }

    @Mutation(() => Url)
    async updateCheckFrequency(
        @Ctx() context: MyContext,
        @Arg("id") id: string,
        @Arg("checkFrequencyId") checkFrequencyId: string,
    ): Promise<Url> {
        try {
            const url = await Url.findOneByOrFail({
                id,
                user: {
                    id: context.payload?.id,
                },
            });

            const userRole: string = url.user!.role;

            if (userRole === Roles.PREMIUM) {
                url.checkFrequency = { id: checkFrequencyId } as CheckFrequency;
                await url.save();
                return url;
            } else {
                throw new Error("Utilisateur non authorisé");
            }
        } catch (error) {
            console.error(`[ERROR] : ${error}`);
            if (error.name === "EntityNotFound") {
                throw new Error("URL non trouvée.");
            }
            if (error.message === "Utilisateur non authorisé") {
                throw new Error("Utilisateur non authorisé.");
            } else {
                throw new Error("Erreur interne, veuillez réessayer.");
            }
        }
    }

    @Mutation(() => Url)
    async updateUrlName(
        @Ctx() context: MyContext,
        @Arg("id") id: string,
        @Arg("name") name: string,
    ): Promise<Url> {
        try {
            const url = await Url.findOneByOrFail({
                id,
                user: {
                    id: context.payload?.id,
                },
            });

            url.name = name;
            await url.save();

            return url;
        } catch (error) {
            console.error(`[ERROR] : ${error}`);
            if (error.name === "EntityNotFound") {
                throw new Error("URL non trouvée.");
            } else {
                throw new Error("Erreur interne, veuillez réessayer.");
            }
        }
    }

    @Mutation(() => Boolean)
    async deleteUrl(
        @Ctx() context: MyContext,
        @Arg("id") id: string,
    ): Promise<boolean> {
        const entityManager = dataSource.manager;
        const queryRunner = entityManager.connection.createQueryRunner();

        try {
            await queryRunner.startTransaction();

            const url = await queryRunner.manager.findOneByOrFail(Url, {
                id,
                user: {
                    id: context.payload?.id,
                },
            });

            await queryRunner.manager.query(
                `
                DELETE 
                FROM notification 
                WHERE id IN (
                    SELECT "notificationId"
                    FROM history
                    WHERE "urlId" = $1
                )
            `,
                [id],
            );

            await queryRunner.manager.delete(History, { url: { id } });

            await queryRunner.manager.remove(url);

            await queryRunner.commitTransaction();

            return true;
        } catch (error) {
            console.error(`[ERROR] : ${error}`);
            await queryRunner.rollbackTransaction();

            if (error.name === "EntityNotFound") {
                throw new Error("URL non trouvée.");
            } else {
                throw new Error("Erreur interne, veuillez réessayer.");
            }
        }
    }
}

export default UrlResolver;
