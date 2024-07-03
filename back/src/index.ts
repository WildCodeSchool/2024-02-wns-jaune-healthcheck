import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { buildSchema } from "type-graphql";
import { HelloWorldResolver } from "./resolvers/helloWorldResolver";
import { startStandaloneServer } from "@apollo/server/standalone";

const start = async() => {
    // Création du schéma GraphQL à partir des résolveurs TypeGraphQL
    const schema = await buildSchema({
        resolvers: [HelloWorldResolver],
    });

    // Création du serveur Apollo avec le schéma généré
    const server = new ApolloServer({ schema });

    // Démarrage du serveur
    const { url } = await startStandaloneServer(server, {listen: { port: 4000 }});
    console.log(`🚀 Server ready at ${url}`);
}

start().catch((error) => {
    console.error("Erreur lors du démarrage du serveur:", error);
});
