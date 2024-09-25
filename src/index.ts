import express from 'express'
import env from './env'
import { authMiddleware, loginMiddleware } from './auth'
import { headerHandler } from './utils/network'

const { server: { port } } = env

const app = express()

app.use(express.json())
app.use(headerHandler)

app.get('/login', loginMiddleware)

app.use(authMiddleware)

app.use('/', (_, res) => res.send('oa'))

app.listen(port, () => console.log(`[SERVER RUNNING IN PORT ${port}]`))
