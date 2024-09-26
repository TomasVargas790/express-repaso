import express from 'express'
import "reflect-metadata"

import env from './env'
import { authMiddleware, loginMiddleware, registerMiddleware } from './auth/service'
import { headerHandler } from './utils/network'

const { server: { port } } = env

const app = express()

app.use(express.json())
app.use(headerHandler)

app.get('/login', loginMiddleware)
app.get('/register', registerMiddleware)

app.use(authMiddleware)

app.use('/', (_, res) => res.send('oa'))

app.listen(port, () => console.log(`[SERVER RUNNING IN PORT ${port}]`))
