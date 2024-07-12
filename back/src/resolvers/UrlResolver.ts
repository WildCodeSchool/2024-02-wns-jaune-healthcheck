import { Resolver, Query, Mutation, Arg, InputType, Field } from "type-graphql";
import { Url } from "../entities/Url";
import { validate } from "class-validator";
import { QueryFailedError, ILike } from "typeorm";

@InputType()
export class UrlInput implements Partial<Url> {
    @Field()
    name: string;

    @Field()
    path: string;
}

@Resolver()
class UrlResolver {
    @Query(() => [Url])
    async urls(
        @Arg("searchText") searchText?: string,
        @Arg("sortField") sortField?: string
    ): Promise<Url[]> {
        try {
            if (searchText && sortField) {
                if (sortField !== "status") {
                    return await Url.find({
                        where: [
                            { name: ILike(`%${searchText}%`) },
                            { path: ILike(`%${searchText}%`) },
                        ],
                        order: { [sortField]: "DESC" },
                    });
                }
                const urls = await Url.find({
                    where: [
                        { name: ILike(`%${searchText}%`) },
                        { path: ILike(`%${searchText}%`) },
                    ]
                });
                return urls.sort((url1: Url, url2: Url) => {
                    const status1 = url1.histories[0]?.status_code || 0;
                    const status2 = url2.histories[0]?.status_code || 0;
                    return status1 - status2;
                });
            } else if (!searchText && sortField) {
                if (sortField !== "status") {
                    return await Url.find({ 
                        order: { [sortField]: sortField === "createdAt" ?  "DESC" : "ASC" } 
                    });
                }
                const urls = await Url.find();
                return urls.sort((url1: Url, url2: Url) => {
                    const status1 = url1.histories[0]?.status_code || 0;
                    const status2 = url2.histories[0]?.status_code || 0;
                    return status1 - status2;
                });

            } else if (searchText && !sortField) {
                return await Url.find({
                    where: [
                        { name: ILike(`%${searchText}%`) },
                        { path: ILike(`%${searchText}%`) },
                    ],
                    order: { createdAt: "DESC" },
                });
            }
            return await Url.find({ order: { createdAt: "DESC" } });


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
