import { DataSource } from "typeorm";
import { Url } from "../entities/Url";
import { History } from "../entities/History";

const dataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: true,
    logging: process.env.APP_ENV === "dev",
    entities: [Url, History],
});

export default dataSource;
