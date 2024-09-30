import "reflect-metadata"
import './utils/logger.js'
import express from 'express';
import { authMiddleware, loginMiddleware, registerMiddleware } from './auth/service.js';
import { initialMiddlewares } from './utils/network.js';
import env from './env.js';

const { server: { port } } = env

const app = express()
initialMiddlewares(app)

app.post('/login', loginMiddleware)
app.post('/register', registerMiddleware)

app.use(authMiddleware)

app.use('/', (_, res) => res.send('oa'))

app.listen(port, () => logger.info(`[SERVER RUNNING IN PORT ${port}]`))
