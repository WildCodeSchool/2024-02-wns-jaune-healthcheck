import { Arg, Mutation } from "type-graphql";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { User } from "../entities/User";

class UserResolver {
    @Mutation(() => String)
    async createUser(
        @Arg("username") username: string,
        @Arg("email") email: string,
        @Arg("password") password: string
    ) {
        const hashedPassword = await argon2.hash(password);
        const userFromDB = await User.save({
            username: username,
            email: email,
            hashedPassword: hashedPassword,
        });

        if (process.env.JWT_SECRET_KEY === undefined) {
            throw new Error("NO JWT SECRET KEY DEFINED");
        }
        const token = jwt.sign(
            { id: userFromDB.id, email: userFromDB.email },
            process.env.JWT_SECRET_KEY
        );

        return token;
    }
}

export default UserResolver;
