import { createPool, PoolOptions } from 'mysql2/promise';
import env from './env'

const { db: { user, password, host, port, name: database } } = env

const config: PoolOptions = {
    host,
    password,
    port,
    user,
    database
}

export const connection = createPool(config)
