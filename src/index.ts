import 'reflect-metadata'
import '@utils/logger'
import express from 'express';
import { authMiddleware } from './auth/service';
import userMiddleware from './auth/controller';
import { errorNotFoundResponse, initialMiddlewares } from './utils/network';
import env from './env';
import mainRouter from './api/index';

const { server: { port } } = env

const app = express()
initialMiddlewares(app)

app.use(userMiddleware)
app.use(authMiddleware)
app.use((req, _, next) => {
    const { url,
        params,
        query,
        body,
        method
    } = req
    console.log({
        url,
        params,
        query,
        body,
        method
    });
    next()
})
mainRouter(app)

app.use((_, res) => errorNotFoundResponse(res))

app.listen(port, () => logger.info(`[SERVER RUNNING IN PORT ${port}]`))
