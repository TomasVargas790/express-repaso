import express from 'express'
import env from './env'

const { server: { port } } = env

const app = express();
app.use(express.json())
app.get('/', (req, res) => res.json({ aaa: 'oaaaa' }))
app.post('/', (req, res) => {
    try {
        const response = Object.values(req.body)
        res.json(response)
    } catch (error) {
        console.error('[ERROR]', error);
        res.send('q')
    }
})

app.listen(port, () => console.log(`[SERVER RUNNING IN PORT ${port}]`))