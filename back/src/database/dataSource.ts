import { DataSource } from "typeorm";
import { Url } from "../entities/Url";
import { History } from "../entities/History";
import { UrlSubscriber } from "../subscribers/UrlSubscribers";
import { User } from "../entities/User";
import { InitDbUrlHistoryUser1720618090787 } from "./migrations/1720618090787-Init_db_Url_History_User";
import { AddUserUrl1720710308167 } from "./migrations/1720710308167-Add-UserUrl";
import { Migrations1724168513925 } from "./migrations/1724168513925-migrations";
import { RemoveUserUrl1724425092272 } from "./migrations/1724425092272-remove-userUrl";

const dataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: process.env.APP_ENV === "test",
    logging: process.env.APP_ENV === "dev",
    entities: [Url, History, User],
    subscribers: [UrlSubscriber],
    migrations: [
        InitDbUrlHistoryUser1720618090787,
        AddUserUrl1720710308167,
        Migrations1724168513925,
        RemoveUserUrl1724425092272
    ],
});

export default dataSource;
