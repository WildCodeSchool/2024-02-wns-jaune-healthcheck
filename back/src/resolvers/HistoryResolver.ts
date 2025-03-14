import { Resolver, Query, Arg, Ctx } from "type-graphql";
import { Not } from "typeorm";
import dataSource from "../database/dataSource";
import { History } from "../entities/History";
import PaginatesHistories from "../types/PaginatesHistories";
import GroupByStatusHistory from "../types/GroupByStatusHistory";
import MyContext from "../types/MyContext";

@Resolver()
class HistoryResolver {
    @Query(() => [History])
    async histories(): Promise<History[]> {
        try {
            return await History.find({ relations: ["url"] });
        } catch (error) {
            console.error(`[ERROR] : ${error}`);
            throw new Error("Erreur interne, veuillez réessayer.");
        }
    }

    @Query(() => History)
    async history(@Arg("id") id: string): Promise<History> {
        try {
            return await History.findOneByOrFail({ id });
        } catch (error) {
            console.error(`[ERROR] : ${error}`);
            throw new Error("Erreur interne, veuillez réessayer.");
        }
    }

    @Query(() => [History])
    async recentPrivateHistories(
        @Ctx() context: MyContext,
    ): Promise<History[]> {
        try {
            if (context.payload) {
                return await dataSource
                    .createQueryBuilder(History, "history")
                    .innerJoinAndSelect("history.url", "url")
                    .innerJoin("url.user", "user")
                    .where("user.id = :userId", { userId: context.payload.id })
                    .orderBy("history.created_at", "DESC")
                    .take(5)
                    .cache(true)
                    .getMany();
            } else {
                throw new Error();
            }
        } catch (error) {
            console.error(`[ERROR] : ${error}`);
            throw new Error("Erreur interne, veuillez réessayer.");
        }
    }

    @Query(() => PaginatesHistories)
    async paginatesHistories(
        @Ctx() context: MyContext,
        @Arg("currentPage", { defaultValue: 1 }) currentPage: number,
        @Arg("privateHistories", { nullable: true }) privateHistories?: boolean,
        @Arg("searchText", { nullable: true }) searchText?: string,
        @Arg("sortField", { nullable: true }) sortField?: string,
        @Arg("urlId", { nullable: true }) urlId?: string,
    ): Promise<PaginatesHistories> {
        try {
            if (context.payload) {
                return await History.getPaginateHistories(
                    currentPage,
                    searchText,
                    sortField,
                    privateHistories,
                    context.payload.id,
                    urlId,
                );
            }
            return await History.getPaginateHistories(
                currentPage,
                searchText,
                sortField,
                false,
                undefined,
                urlId,
            );
        } catch (error) {
            console.error(`[ERROR] : ${error}`);
            throw new Error("Erreur interne, veuillez réessayer.");
        }
    }

    @Query(() => History)
    async historyWithResponse(@Arg("urlId") urlId: string): Promise<History> {
        try {
            const history = await History.findOneOrFail({
                where: {
                    url: { id: urlId },
                    response: Not(""),
                },
            });
            return history;
        } catch (error) {
            console.error(`[ERROR] : ${error}`);
            throw new Error("Erreur interne, veuillez réessayer.");
        }
    }

    @Query(() => [GroupByStatusHistory])
    async privateHistoriesByStatus(@Ctx() context: MyContext) {
        try {
            if (context.payload) {
                const data = await History.getGroupByStatusPrivateHistories(
                    context.payload.id,
                );
                const statusCodes = [
                    200, 401, 403, 301, 302, 304, 404, 408, 500, 502, 503, 504,
                    520,
                ];
                return statusCodes.map((statusCode) => {
                    return {
                        statusCode,
                        countJson:
                            data.find(
                                (value) => value.statusCode === statusCode,
                            )?.countJson || 0,
                        countHtml:
                            data.find(
                                (value) => value.statusCode === statusCode,
                            )?.countHtml || 0,
                        countUnknown:
                            data.find(
                                (value) => value.statusCode === statusCode,
                            )?.countUnknown || 0,
                    };
                });
            } else {
                throw new Error("User unauthenticated");
            }
        } catch (error) {
            console.error(`[ERROR] : ${error}`);
            if (error.message === "User unauthenticated") {
                throw new Error("Utilisateur non authentifié.");
            } else {
                throw new Error("Erreur interne, veuillez réessayer.");
            }
        }
    }
}

export default HistoryResolver;
