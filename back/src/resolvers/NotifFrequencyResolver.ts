import { NotifFrequency } from "../entities/NotifFrequency";
import { Query, Resolver } from "type-graphql";

@Resolver()
class NotifFrequencyResolver {
    @Query(() => [NotifFrequency])
    async notifFrequencies(): Promise<NotifFrequency[]> {
        try {
            return await NotifFrequency.find();
        } catch (error) {
            console.error(`[ERROR] : ${error}`);
            throw new Error(
                "Erreur lors de récupération des fréquences de notification.",
            );
        }
    }
}

export default NotifFrequencyResolver;
