import "reflect-metadata"
import './utils/logger.js'
import express from 'express';
import { authMiddleware } from './auth/service.js';
import userMiddleware from './auth/controller.js';
import { initialMiddlewares } from './utils/network.js';
import env from './env.js';
import mainRouter from "./api/index.js";

const { server: { port } } = env

const app = express()
initialMiddlewares(app)

app.use(userMiddleware)//Register - Login
app.use(authMiddleware)//Validate JWT
mainRouter(app)

app.use('/', (_, res) => res.send('oa'))

app.listen(port, () => logger.info(`[SERVER RUNNING IN PORT ${port}]`))
