import { Field, ObjectType } from "type-graphql";

@ObjectType()
class GroupByStatusHistory {
    @Field()
    statusCode: number;

    @Field()
    countJson: number;

    @Field()
    countHtml: number;
}
    



export default GroupByStatusHistory;