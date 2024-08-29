import "reflect-metadata";
import path from 'path';
import "dotenv/config";
import * as jwt from "jsonwebtoken";
import { ApolloServer, BaseContext } from "@apollo/server";
import { buildSchema } from "type-graphql";
import { startStandaloneServer } from "@apollo/server/standalone";
import dataSource from "./database/dataSource";
import UrlResolver from "./resolvers/UrlResolver";
import HistoryResolver from "./resolvers/HistoryResolver";
import UserResolver from "./resolvers/UserResolver";
import WorkerThread from "./thread/Worker";

export interface JwtPayload {
    id: string;
    email: string;
}

export interface MyContext extends BaseContext {
    res: {
        setHeader: (name: string, value: string) => void;
    };
    payload?: JwtPayload;
}

const start = async () => {
    // Initialisation de la connexion à la base de données
    await dataSource.initialize();

    // Création du schéma GraphQL à partir des résolveurs TypeGraphQL
    const schema = await buildSchema({
        resolvers: [
            UrlResolver,
            HistoryResolver,
            UserResolver,
        ],
        authChecker: ({ context }) => {
            if (!context.payload) return false;
            return true;
        },
    });

    // Création du serveur Apollo avec le schéma généré
    const server = new ApolloServer({ schema });

    // Initialisation du worker checkUrlWorker
    const checkUrlWorker = new WorkerThread(
        path.join(__dirname, 'schedulers', 'schedules', 'checkUrlSchedule.ts')
    );

    // Démarrage du serveur
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
        context: async ({ req, res }): Promise<MyContext> => {
            if (!process.env.JWT_SECRET_KEY) return { res };

            const token = req.headers.cookie?.split("token=")[1];
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
    });
    checkUrlWorker.start();
    console.log(`🚀 Server ready at ${url}`);
};

start().catch((error) => {
    console.error("Erreur lors du démarrage du serveur:", error);
});
