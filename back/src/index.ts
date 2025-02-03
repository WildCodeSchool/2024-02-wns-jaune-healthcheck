import "reflect-metadata";
import path from "path";
import express from "express";
import "dotenv/config";
import dataSource from "./database/dataSource";
import UrlResolver from "./resolvers/UrlResolver";
import HistoryResolver from "./resolvers/HistoryResolver";
import UserResolver from "./resolvers/UserResolver";
import CheckFrequencyResolver from "./resolvers/CheckFrequencyResolver";
import startServer from "./startServer";
import WorkerThread from "./thread/Worker";
import NotificationResolver from "./resolvers/NotificationResolver";
import NotifFrequencyResolver from "./resolvers/NotifFrequencyResolver";
import SubscriptionResolver from "./resolvers/SubscriptionResolver";

const app = express();
const port = process.env.BACKEND_PORT;
const appEnv = process.env.APP_ENV;

const start = async () => {
    const { httpServer, wsServer } = await startServer(
        [
            UrlResolver,
            HistoryResolver,
            UserResolver,
            CheckFrequencyResolver,
            NotificationResolver,
            NotifFrequencyResolver,
            SubscriptionResolver,
        ],
        app,
    );

    // Add worker thread for checkUrlSchedule and bind io websocket Server
    const scheduleFile =
        appEnv === "production" ? "checkUrlSchedule.js" : "checkUrlSchedule.ts";
    const checkUrlWorker = new WorkerThread(
        path.join(__dirname, "schedulers", "schedules", scheduleFile),
        wsServer,
    );
    checkUrlWorker.start();

    httpServer.listen(port, async () => {
        await dataSource.initialize();
        console.log(`🚀 Server ready at http://localhost:${port}`);
        console.log(`🚀 Socket.IO ready`);
    });
};

start().catch((error) => {
    console.error("Erreur lors du démarrage du serveur:", error);
});
