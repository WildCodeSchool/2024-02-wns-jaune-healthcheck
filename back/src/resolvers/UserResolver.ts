import { Arg, Ctx, Mutation } from "type-graphql";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { User } from "../entities/User";

function setCookie(context: any, token: string) {
    let expireCookieUTC = new Date();
    expireCookieUTC.setSeconds(
        expireCookieUTC.getSeconds() + Number(process.env.COOKIE_TTL),
    );

    const secureCookie = process.env.APP_ENV === "production" ? "; Secure" : "";

    context.res.setHeader(
        "Set-Cookie",
        `token=${token}${secureCookie};httpOnly;expires=${expireCookieUTC.toUTCString()}`,
    );
}

function getUserBasicInfo(user: User) {
    return {
        id: user.id,
        email: user.email,
        username: user.username,
    };
}

class UserResolver {
    @Mutation(() => String)
    async createUser(
        @Arg("username") username: string,
        @Arg("email") email: string,
        @Arg("password") password: string,
    ) {
        if (process.env.JWT_SECRET_KEY === undefined) {
            throw new Error("NO JWT SECRET KEY DEFINED");
        }

        const hashedPassword = await argon2.hash(password);
        const userFromDB = await User.save({
            username: username,
            email: email,
            hashedPassword: hashedPassword,
        });

        const token = jwt.sign(
            { id: userFromDB.id, email: userFromDB.email },
            process.env.JWT_SECRET_KEY,
        );

        return token;
    }

    @Mutation(() => String)
    async login(
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Ctx() context: any,
    ) {
        try {
            if (process.env.JWT_SECRET_KEY === undefined) {
                throw new Error("NO JWT SECRET KEY DEFINED");
            }

            const userFromDB = await User.findOneByOrFail({ email });

            const isCorrectPassword = await argon2.verify(
                userFromDB.hashedPassword,
                password,
            );

            if (!isCorrectPassword) {
                throw new Error();
            }

            const token = jwt.sign(
                { id: userFromDB.id, email: userFromDB.email },
                process.env.JWT_SECRET_KEY,
            );
            setCookie(context, token);

            return JSON.stringify(getUserBasicInfo(userFromDB));
        } catch (error) {
            console.log(error);
            throw new Error("Bad request");
        }
    }
}

export default UserResolver;
