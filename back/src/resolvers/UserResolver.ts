import { Arg, Ctx, Mutation, Query } from "type-graphql";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { User } from "../entities/User";
import MyContext from "../types/MyContext";
import { Roles } from "../entities/User";

function setCookie(context: MyContext, token: string) {
    const expireCookieUTC = new Date();
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
        role: user.role,
    };
}

class UserResolver {
    @Mutation(() => String)
    async createUser(
        @Arg("username") username: string,
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Ctx() context: MyContext,
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

        setCookie(context, token);

        return JSON.stringify(getUserBasicInfo(userFromDB));
    }

    @Mutation(() => String)
    async login(
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Ctx() context: MyContext,
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

    @Mutation(() => String)
    async subscribe(@Arg("role") role: string, @Ctx() context: MyContext) {
        try {
            if (role in Roles) {
                throw new Error("Bad request");
            }
            if (context.payload) {
                const userFromDB = await User.findOneByOrFail({
                    id: context.payload.id,
                });
                userFromDB.role =
                    Roles[role.toLocaleUpperCase() as keyof typeof Roles];
                await User.save(userFromDB);
                return JSON.stringify(getUserBasicInfo(userFromDB));
            } else throw new Error();
        } catch (error) {
            console.log(error);
            throw new Error("Bad request");
        }
    }

    @Query(() => String)
    async logout(@Ctx() context: MyContext) {
        context.res.setHeader("Set-Cookie", `token=;Max-Age=0`);
        return "Logged out";
    }

    @Query(() => String)
    async me(@Ctx() context: MyContext) {
        try {
            if (context.payload) {
                const userFromDB = await User.findOneByOrFail({
                    id: context.payload.id,
                });
                return JSON.stringify(getUserBasicInfo(userFromDB));
            } else throw new Error();
        } catch (error) {
            console.log(error);
            throw new Error("Bad request");
        }
    }

    @Query(() => String)
    async getAllUsers(@Ctx() context: MyContext) {
        try {
            if (context.payload) {
                const requestingUser = await User.findOneByOrFail({
                    id: context.payload.id,
                });

                if (requestingUser.role !== Roles.ADMIN) {
                    throw new Error("Unauthorized");
                }

                const users = await User.find();
                return JSON.stringify(users.map(getUserBasicInfo));
            } else throw new Error();
        } catch (error) {
            console.log(error);
            throw new Error("Bad request");
        }
    }
}

export default UserResolver;
