import MyContext from "@/types/MyContext";
import { User } from "../entities/User";
import UserResolver from "../resolvers/UserResolver";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

describe("UserResolver", () => {
    let userResolver: UserResolver;
    let mockContext: MyContext;
    let mockUser: User;
    let passwordTest: string;

    beforeEach(() => {
        userResolver = new UserResolver();
        mockUser = {
            id: "e5fb990e-f9d9-4858-82d1-1fd1755485a5",
            username: "Pierre",
            email: "pierre@health-checker.fr",
        } as User;
        passwordTest = "password123";
        mockContext = {
            res: {
                setHeader: jest.fn(),
            },
            payload: { id: mockUser.id, email: mockUser.email },
        };
        process.env.JWT_SECRET_KEY = "TEST_KEY";
    });

    it("createUser should hash password, save user, generate token, and return user info", async () => {
        jest.spyOn(argon2, "hash").mockResolvedValue("hashedPassword");
        jest.spyOn(User, "save").mockResolvedValue(mockUser);
        jest.spyOn(jwt, "sign").mockImplementation(() => "mockToken");

        const result = await userResolver.createUser(
            mockUser.username,
            mockUser.email,
            passwordTest,
            mockContext,
        );

        expect(User.save).toHaveBeenCalled();
        expect(mockContext.res.setHeader).toHaveBeenCalledWith(
            "Set-Cookie",
            expect.stringContaining("token=mockToken"),
        );
        expect(JSON.parse(result)).toEqual({
            id: mockUser.id,
            username: mockUser.username,
            email: mockUser.email,
        });
    });

    it("should log in a user and set a cookie", async () => {
        jest.spyOn(User, "findOneByOrFail").mockResolvedValue(mockUser);
        jest.spyOn(argon2, "verify").mockResolvedValue(true);
        jest.spyOn(jwt, "sign").mockImplementation(() => "mockToken");

        const result = await userResolver.login(
            mockUser.username,
            passwordTest,
            mockContext,
        );

        expect(User.findOneByOrFail).toHaveBeenCalledWith({
            email: mockUser.username,
        });
        expect(mockContext.res.setHeader).toHaveBeenCalledWith(
            "Set-Cookie",
            expect.stringContaining("token=mockToken"),
        );
        expect(JSON.parse(result)).toEqual({
            id: mockUser.id,
            username: mockUser.username,
            email: mockUser.email,
        });
    });

    it("should log out a user", async () => {
        const result = await userResolver.logout(mockContext);

        expect(mockContext.res.setHeader).toHaveBeenCalledWith(
            "Set-Cookie",
            "token=;Max-Age=0",
        );
        expect(result).toBe("Logged out");
    });
});
