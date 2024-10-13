import 'reflect-metadata'
import '../../utils/logger'
import { DataSource } from 'typeorm'
import { db } from '../../env'
import { connectWithRetry } from './utils'
import { entities, migrations } from './helper'

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
    synchronize: false,
    logging: false,
    entities,
    migrations,
    subscribers: [],
    connectTimeout: 10000
})

connectWithRetry(AppDataSource);