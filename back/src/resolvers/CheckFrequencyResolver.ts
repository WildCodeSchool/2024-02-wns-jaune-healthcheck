import { Resolver, Query } from "type-graphql";
import { CheckFrequency } from "../entities/CheckFrequency";


@Resolver()
class CheckFrequencyResolver {
    @Query(() => [CheckFrequency])
    async checkFrequencies(): Promise<CheckFrequency[]> {
        try {
            return await CheckFrequency.find();
        } catch (error) {
            throw new Error("Internal server error");
        }
    }
}

export default CheckFrequencyResolver;