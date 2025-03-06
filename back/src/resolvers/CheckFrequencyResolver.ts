import { Resolver, Query } from "type-graphql";
import { CheckFrequency } from "../entities/CheckFrequency";

@Resolver()
class CheckFrequencyResolver {
    @Query(() => [CheckFrequency])
    async checkFrequencies(): Promise<CheckFrequency[]> {
        try {
            return await CheckFrequency.find();
        } catch (error) {
            console.error(`[ERROR] : ${error}`);
            throw new Error("Erreur interne, veuillez réessayer.");
        }
    }
}

export default CheckFrequencyResolver;
