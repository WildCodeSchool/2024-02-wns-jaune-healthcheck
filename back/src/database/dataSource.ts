import { DataSource } from "typeorm";
import { Url } from "../entities/Url";
import { History } from "../entities/History";
import { UrlSubscriber } from "../subscribers/UrlSubscribers";
import { HistorySubscriber } from "../subscribers/HistorySubscriber";
import { User } from "../entities/User";
import { Notification } from "../entities/Notification";
import { CheckFrequency } from "../entities/CheckFrequency";
import { NotifFrequency } from "../entities/NotifFrequency";
import { InitDbUrlHistoryUser1720618090787 } from "./migrations/1720618090787-Init_db_Url_History_User";
import { AddUserUrl1720710308167 } from "./migrations/1720710308167-Add-UserUrl";
import { Migrations1724168513925 } from "./migrations/1724168513925-migrations";
import { RemoveUserUrl1724425092272 } from "./migrations/1724425092272-remove-userUrl";
import { AddCheckFrequencyTable1724667282358 } from "./migrations/1724667282358-add-check_frequency_table";
import { Migrations1728463402298 } from "./migrations/1728463402298-migrations";
import { UserRoles1728546932904 } from "./migrations/1728546932904-UserRoles";
import { RolesEnum1728550416099 } from "./migrations/1728550416099-RolesEnum";
import { Notification1728629185397 } from "./migrations/1728629185397-notification";
import { AddFieldContentTypeHistoryTable1736153283751 } from "./migrations/1736153283751-Add-field-content-type-history-table";
import { NotifFrequency1736519806535 } from "./migrations/1736519806535-notifFrequency";
import { TierRoleEnum1736421400775 } from "./migrations/1736421400775-tier-role-enum";
import { UrlDeleteCascade1736522105212 } from "./migrations/1736522105212-url-delete-cascade";

const dataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: process.env.APP_ENV === "test",
    // logging: process.env.APP_ENV === "dev" || process.env.APP_ENV === "test",
    logging: false,
    entities: [
        Url,
        History,
        User,
        CheckFrequency,
        Notification,
        NotifFrequency,
    ],
    subscribers: [UrlSubscriber, HistorySubscriber],
    migrations: [
        InitDbUrlHistoryUser1720618090787,
        AddUserUrl1720710308167,
        Migrations1724168513925,
        RemoveUserUrl1724425092272,
        AddCheckFrequencyTable1724667282358,
        Migrations1728463402298,
        UserRoles1728546932904,
        RolesEnum1728550416099,
        Notification1728629185397,
        AddFieldContentTypeHistoryTable1736153283751,
        NotifFrequency1736519806535,
        TierRoleEnum1736421400775,
        UrlDeleteCascade1736522105212,
    ],
});

export default dataSource;
