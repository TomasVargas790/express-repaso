import "reflect-metadata"
import { DataSource } from "typeorm"
import env from '../../env.js'
import { connectWithRetry } from "./utils.js"

const { db: { host,
    name: database,
    password,
    port,
    protocol: type,
    user: username
} } = env

export const AppDataSource = new DataSource({
    type,
    host,
    port,
    username,
    password,
    database,
    synchronize: true,
    logging: false,
    entities: ["src/db/entity/*.{ts,js}"],
    migrations: ["src/db/migration/*.{ts,js}"],
    subscribers: [],
    connectTimeout: 10000
})

connectWithRetry(AppDataSource);