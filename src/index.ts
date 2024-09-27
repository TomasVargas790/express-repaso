import express from 'express';
import { authMiddleware, loginMiddleware, registerMiddleware } from './auth/service.js';
import { headerHandler } from './utils/network.js';
import env from './env.js';

const { server: { port } } = env

const app = express()

app.use(express.json())
app.use(headerHandler)

app.get('/login', loginMiddleware)
app.get('/register', registerMiddleware)

app.use(authMiddleware)

app.use('/', (_, res) => res.send('oa'))

app.listen(port, () => console.log(`[SERVER RUNNING IN PORT ${port}]`))
