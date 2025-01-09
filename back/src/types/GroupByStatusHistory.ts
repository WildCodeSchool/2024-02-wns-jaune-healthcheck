import { Field, ObjectType } from "type-graphql";

@ObjectType()
class GroupByStatusHistory {
    @Field()
    statusCode: number;

    @Field()
    countJson: number;

    @Field()
    countHtml: number;

    @Field()
    countUnknown: number;
}
    



export default GroupByStatusHistory;