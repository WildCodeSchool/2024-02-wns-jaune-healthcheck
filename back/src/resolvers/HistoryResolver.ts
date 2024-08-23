import { Resolver, Query, Arg, Ctx } from "type-graphql";
import { History } from "../entities/History";
import { MyContext } from "..";

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
                            userUrl: {
                                userId: context.payload.id,
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
}

export default HistoryResolver;
