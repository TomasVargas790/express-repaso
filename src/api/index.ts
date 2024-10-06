import type { Express } from 'express';
import BrandRouter from './Brand/controller.js'

export default function mainRouter(app: Express) {
    app.use('/brand',BrandRouter)
    return app;
}