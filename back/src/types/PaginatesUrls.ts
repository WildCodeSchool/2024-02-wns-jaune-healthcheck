import { Field, ObjectType } from "type-graphql";
import { Url } from "../entities/Url";

@ObjectType()
class PaginateUrls {
    @Field(() => [Url])
    urls: Url[];

    @Field()
    totalPages: number;

    @Field()
    currentPage: number;

    @Field()
    previousPage: number;

    @Field()
    nextPage: number;
}

export default PaginateUrls;
