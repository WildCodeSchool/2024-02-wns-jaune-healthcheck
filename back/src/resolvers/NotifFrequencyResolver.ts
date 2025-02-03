import { NotifFrequency } from "../entities/NotifFrequency";
import { Query, Resolver } from "type-graphql";

@Resolver()
class NotifFrequencyResolver {
    @Query(() => [NotifFrequency])
    async notifFrequency(): Promise<NotifFrequency[]> {
        try {
            return await NotifFrequency.find();
        } catch (err) {
            throw new Error(err);
        }
    }
}

export default NotifFrequencyResolver;
