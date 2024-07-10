import "reflect-metadata";
import "dotenv/config";
import * as jwt from "jsonwebtoken";
import { ApolloServer } from "@apollo/server";
import { buildSchema } from "type-graphql";
import { startStandaloneServer } from "@apollo/server/standalone";
import dataSource from "./database/dataSource";
import UrlResolver from "./resolvers/UrlResolver";
import HistoryResolver from "./resolvers/HistoryResolver";
import UserResolver from "./resolvers/UserResolver";

const start = async () => {
    // Initialisation de la connexion à la base de données
    await dataSource.initialize();

    // Création du schéma GraphQL à partir des résolveurs TypeGraphQL
    const schema = await buildSchema({
        resolvers: [UrlResolver, HistoryResolver, UserResolver],
        authChecker: ({ context }) => {
            if (!context.payload) return false;
            return true;
        },
    });

    // Création du serveur Apollo avec le schéma généré
    const server = new ApolloServer({ schema });

    // Démarrage du serveur
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
        context: async ({ req, res }) => {
            if (!process.env.JWT_SECRET_KEY) return { res };

            if (!req.headers.authorization) return { res };

            if (!req.headers.cookie) return { res };

            const payload = jwt.verify(
                req.headers.cookie.split("token=")[1],
                process.env.JWT_SECRET_KEY,
            );
            if (payload) {
                return { payload, res };
            }

            return { res };
        },
    });
    console.log(`🚀 Server ready at ${url}`);
};

start().catch((error) => {
    console.error("Erreur lors du démarrage du serveur:", error);
});
