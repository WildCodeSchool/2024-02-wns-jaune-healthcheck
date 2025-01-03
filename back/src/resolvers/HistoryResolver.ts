import { Resolver, Query, Arg, Ctx } from "type-graphql";
import { Not } from "typeorm";
import { History } from "../entities/History";
import PaginatesHistories from "../types/PaginatesHistories";
import MyContext from "../types/MyContext";

@Resolver()
class HistoryResolver {
    @Query(() => [History])
    async histories(): Promise<History[]> {
        try {
            return await History.find({ relations: ["url"] });
        } catch (error) {
            throw new Error("Internal server error");
        }
    }

    @Query(() => History)
    async history(@Arg("id") id: string): Promise<History> {
        try {
            return await History.findOneByOrFail({ id });
        } catch (error) {
            throw new Error("Internal server error");
        }
    }

    @Query(() => [History])
    async recentPrivateHistories(
        @Ctx() context: MyContext,
    ): Promise<History[]> {
        try {
            if (context.payload) {
                return await History.find({
                    order: { created_at: "DESC" },
                    relations: ["url"],
                    where: {
                        url: {
                            user: {
                                id: context.payload.id,
                            },
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
        } catch (err) {
            throw new Error(err);
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
            throw new Error("Internal server error");
        }
    }
}

export default HistoryResolver;
