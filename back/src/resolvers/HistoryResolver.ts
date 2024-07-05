import { Resolver, Query, Mutation, Arg, InputType, Field } from "type-graphql";
import { History } from "../entities/History";
import { Url } from "../entities/Url";
import { validate } from "class-validator";

@InputType()
class HistoryInput implements Partial<History> {
    @Field()
    status_code: number;

    @Field()
    response: string;

    @Field()
    urlId: string;
}

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

    @Mutation(() => History)
    async addHistory(
        @Arg("historyData") historyData: HistoryInput,
    ): Promise<History> {
        try {
            const url = await Url.findOneByOrFail({ id: historyData.urlId });
            if (!url) {
                throw new Error("URL not found");
            }

            const history = History.create({
                ...historyData,
                url: url,
            });

            const dataValidationError = await validate(history);
            if (dataValidationError.length > 0) {
                throw new Error("Data validation error");
            }

            await history.save();
            return history;
        } catch (error) {
            if (
                error.message === "Data validation error" ||
                error.message === "URL not found"
            ) {
                throw new Error(error.message);
            }
            throw new Error("Internal server error");
        }
    }
}

export default HistoryResolver;
