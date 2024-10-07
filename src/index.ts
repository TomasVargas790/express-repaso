import "reflect-metadata"
import './utils/logger.js'
import express from 'express';
import { authMiddleware } from './auth/service.js';
import userMiddleware from './auth/controller.js';
import { errorNotFoundResponse, initialMiddlewares } from './utils/network.js';
import env from './env.js';
import mainRouter from "./api/index.js";

const { server: { port } } = env

const app = express()
initialMiddlewares(app)

app.use(userMiddleware)//Register - Login
app.use(authMiddleware)//Validate JWT
mainRouter(app)

app.use((_, res) => errorNotFoundResponse(res))

app.listen(port, () => logger.info(`[SERVER RUNNING IN PORT ${port}]`))
