import { Resolver, Query, Mutation, Arg, InputType, Field } from "type-graphql";
import { Url } from "../entities/Url";
import { validate } from "class-validator";
import { QueryFailedError } from "typeorm";

@InputType()
class UrlInput implements Partial<Url> {
    @Field()
    name: string;

    @Field()
    path: string;
}

@Resolver()
class UrlResolver {
    @Query(() => [Url])
    async urls(): Promise<Url[]> {
        try {
            const ulrs = await Url.find();
            return ulrs;
        } catch (_error) {
            throw new Error("Internal server error");
        }
    }
    @Query(() => Url)
    async url(@Arg("id") id: string): Promise<Url> {
        try {
            const ulr = await Url.findOneByOrFail({
                id: id,
            });
            return ulr;
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
                if (error.message.includes("duplicate key value violates unique constraint")) {
                    throw new Error("Le chemin de l'url doit être unique");
                } else {
                    throw new Error("Erreur lors de l'ajout de l'url dans la base de données");
                }
            }
            if (error.message === "Data validation error") {
                throw new Error(error.message);
            }
            throw new Error("Internal server error");
        }
    }
}

export default UrlResolver;
