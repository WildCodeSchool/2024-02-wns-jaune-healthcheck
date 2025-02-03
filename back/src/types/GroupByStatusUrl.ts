import { Field, ObjectType } from "type-graphql";

@ObjectType()
class GroupByStatusUrl {
    @Field()
    dateTime: string;

    @Field()
    onLine: number;

    @Field()
    offLine: number;
}

export default GroupByStatusUrl;
