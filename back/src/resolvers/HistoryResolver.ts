import { Resolver, Query, Arg, Ctx } from "type-graphql";
import { History } from "../entities/History";
import { MyContext } from "..";
import PaginatesHistories from "../types/PaginatesHistories";

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
        @Arg("privateHistories", { defaultValue: false })
        privateHistories: boolean,
        @Arg("currentPage", { defaultValue: 1 }) currentPage: number,
        @Arg("searchText", { nullable: true }) searchText?: string,
        @Arg("sortField", { nullable: true }) sortField?: string,
    ): Promise<PaginatesHistories> {
        try {
            if (context.payload) {
                return await History.getPaginateHistories(
                    currentPage,
                    searchText,
                    sortField,
                    privateHistories,
                    context.payload.id,
                );
            }
            return await History.getPaginateHistories(
                currentPage,
                searchText,
                sortField,
            );
        } catch (err) {
            throw new Error(err);
        }
    }
}

export default HistoryResolver;
