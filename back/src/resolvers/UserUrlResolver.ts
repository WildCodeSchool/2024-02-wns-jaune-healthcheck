import { Mutation, Arg, Ctx, Authorized } from "type-graphql";
import { Url } from "../entities/Url";
import { validate } from "class-validator";
import { QueryFailedError } from "typeorm";
import { UserUrl } from "../entities/UserUrl";
import { MyContext } from "@/index";
import { UrlInput } from "./UrlResolver";

class UserUrlResolver {
    @Authorized()
    @Mutation(() => Url)
    async addUserUrl(
        @Arg("urlData") urlData: UrlInput,
        @Arg("isPrivate") isPrivate: boolean,
        @Ctx() context: MyContext,
    ): Promise<Url> {
        try {
            if (context.payload) {
                const url = Url.create({ ...urlData });
                const dataValidationError = await validate(url);
                if (dataValidationError.length > 0) {
                    throw new Error("Data validation error");
                }
                await url.save();

                if (isPrivate) {
                    await UserUrl.save({
                        urlId: url.id,
                        userId: context.payload.id,
                    });
                }

                return url;
            } else {
                throw new Error();
            }
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

export default UserUrlResolver;
