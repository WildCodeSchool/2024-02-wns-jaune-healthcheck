import "reflect-metadata";
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
    });

    // Création du serveur Apollo avec le schéma généré
    const server = new ApolloServer({ schema });

    // Démarrage du serveur
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
    });
    console.log(`🚀 Server ready at ${url}`);
};

start().catch((error) => {
    console.error("Erreur lors du démarrage du serveur:", error);
});
