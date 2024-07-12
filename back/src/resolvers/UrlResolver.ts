import { 
    Resolver, 
    Query, 
    Mutation, 
    Arg, 
    InputType, 
    Field,
    ObjectType,
    Ctx } from "type-graphql";
import { Url } from "../entities/Url";
import { validate } from "class-validator";
import { QueryFailedError, ILike } from "typeorm";
import { MyContext } from "@/index";

@InputType()
export class UrlInput implements Partial<Url> {
    @Field()
    name: string;

    @Field()
    path: string;
}

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

@Resolver()
class UrlResolver {
    @Query(() => PaginateUrls)
    async urls(
        @Arg("currentPage", { defaultValue: 1 }) currentPage: number,
        @Arg("searchText") searchText?: string,
        @Arg("sortField") sortField?: string,
    ): Promise<PaginateUrls> {
        try {
            let urls: Url[];
            const skip: number = currentPage * 16 - 16;
            if (searchText && sortField) {

                if (sortField !== "status") {
                    urls = await Url.find({
                        where: [
                            { name: ILike(`%${searchText}%`) },
                            { path: ILike(`%${searchText}%`) },
                        ],
                        order: { [sortField]: "DESC" },
                        skip: skip,
                        take: 16,
                    });
                } else {
                    urls = await Url.find({
                        where: [
                            { name: ILike(`%${searchText}%`) },
                            { path: ILike(`%${searchText}%`) },
                        ],
                        skip: skip,
                        take: 16,
                    });
                    urls.sort((url1: Url, url2: Url) => {
                        const status1 = url1.histories[0]?.status_code || 0;
                        const status2 = url2.histories[0]?.status_code || 0;
                        return status1 - status2;
                    });
                }
            } else if (!searchText && sortField) {

                if (sortField !== "status") {
                    urls = await Url.find({ 
                        order: { [sortField]: sortField === "createdAt" ?  "DESC" : "ASC" },
                        skip: skip,
                        take: 16,
                    });
                } else {
                    urls = await Url.find({ skip: skip, take: 16 });
                    urls.sort((url1: Url, url2: Url) => {
                        const status1 = url1.histories[0]?.status_code || 0;
                        const status2 = url2.histories[0]?.status_code || 0;
                        return status1 - status2;
                    });
                }

            } else if (searchText && !sortField) {

                urls = await Url.find({
                    where: [
                        { name: ILike(`%${searchText}%`) },
                        { path: ILike(`%${searchText}%`) },
                    ],
                    order: { createdAt: "DESC" },
                    skip: skip,
                    take: 16,
                });

            } else {
                urls = await Url.find({ 
                    order: { createdAt: "DESC" },
                    skip: skip,
                    take: 16,
                });
            }
            

            const countUrls = await Url.count({
                where: [
                    { name: ILike(`%${searchText}%`) },
                    { path: ILike(`%${searchText}%`) },
                ]
            });

            const totalPages: number = Math.ceil(countUrls / 16);

            return {
                urls: urls,
                totalPages: totalPages,
                currentPage: currentPage,
                previousPage: Math.max(currentPage - 1, 0),
                nextPage: Math.min(currentPage + 1, totalPages),
            };

        } catch (_error) {
            throw new Error("Internal server error");
        }
    }

    @Query(() => Url)
    async url(@Arg("id") id: string): Promise<Url> {
        try {
            const url = await Url.findOneByOrFail({
                id: id,
            });
            return url;
        } catch (_error) {
            throw new Error("Internal server error");
        }
    }

    @Query(() => [Url])
    async recentPrivateUrls(@Ctx() context: MyContext): Promise<Url[]> {
        try {
            if (context.payload) {
                return await Url.find({
                    order: { createdAt: "DESC" },
                    where: {
                        userUrl: {
                            userId: context.payload.id,
                        },
                    },
                    take: 5,
                });
            } else {
                throw new Error();
            }
        } catch (_error) {
            throw new Error("Internal server error");
        }
    }

    @Mutation(() => Url)
    async addUrl(@Arg("urlData") urlData: UrlInput): Promise<Url> {
        try {
            const url = Url.create({ ...urlData });
            const dataValidationError = await validate(url);
            if (dataValidationError.length > 0) {
                throw new Error("Data validation error");
            }
            await url.save();
            return url;
        } catch (error) {
            if (error instanceof QueryFailedError) {
                throw new Error(
                    "Erreur lors de l'ajout de l'url dans la base de données",
                );
            }
            if (error.message === "Data validation error") {
                throw new Error(
                    "Erreur de validation des données, l'url doit comporter un chemin valide ex: http(s)://...",
                );
            }
            throw new Error("Internal server error");
        }
    }
}

export default UrlResolver;
