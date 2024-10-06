import "reflect-metadata"
import '../../utils/logger.js'
import { DataSource } from "typeorm"
import { db } from '../../env.js'
import { connectWithRetry } from "./utils.js"
import entities from '@db/entity/index.js'

const { host,
    name: database,
    password,
    port,
    protocol: type,
    user: username
} = db

export const AppDataSource = new DataSource({
    type,
    host,
    port,
    username,
    password,
    database,
    synchronize: true,
    logging: false,
    entities,
    migrations: ["./db/migration/*.{js,ts}"],
    subscribers: [],
    connectTimeout: 10000
})

connectWithRetry(AppDataSource);