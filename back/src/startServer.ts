import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { buildSchema, NonEmptyArray, ClassType } from "type-graphql";
import http from "http";
import cors from "cors";
import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import * as jwt from "jsonwebtoken";
import { Server } from "socket.io";
import JwtPayload from "./types/JwtPayload";
import MyContext from "./types/MyContext";

const startServer = async (
    resolvers: NonEmptyArray<ClassType>,
    app: express.Express,
) => {
    const schema = await buildSchema({
        resolvers: resolvers,
        authChecker: ({ context }) => {
            return context.payload.email;
        },
    });

    const httpServer = http.createServer(app);

    const apolloServer = new ApolloServer<MyContext>({
        schema,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    await apolloServer.start();

    app.use(
        "/",
        cors<cors.CorsRequest>(),
        express.json(),
        expressMiddleware(apolloServer, {
            context: async ({ req, res }): Promise<MyContext> => {
                if (!process.env.JWT_SECRET_KEY) return { res };

                const token = req.headers.cookie?.split("token=")[1].split(";")[0];
                if (token) {
                    const payload = jwt.verify(
                        token,
                        process.env.JWT_SECRET_KEY,
                    ) as JwtPayload;
                    if (payload) {
                        return { payload, res };
                    }
                }
                return { res };
            },
        }),
    );

    // Create a new socket.io server
    const wsServer = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
        path: "/ws",
    });

    // Manage connexions
    wsServer.on("connection", (socket) => {
        console.log("user connected");
        socket.on("disconnect", () => {
            console.log("user disconnected");
        });
    });

    return { apolloServer, httpServer, wsServer };
};

export default startServer;
