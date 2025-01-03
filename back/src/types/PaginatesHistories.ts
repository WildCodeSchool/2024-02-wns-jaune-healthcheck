import { Field, ObjectType } from "type-graphql";
import { History } from "../entities/History";

@ObjectType()
class PaginatesHistories {
    @Field(() => [History])
    histories: History[];

    @Field()
    totalPages: number;

    @Field()
    currentPage: number;

    @Field()
    previousPage: number;

    @Field()
    nextPage: number;
}

export default PaginatesHistories;
