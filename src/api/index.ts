import type { Express } from 'express';
import BrandRouter from './Brand/controller'
import CategoryRouter from './Category/controller'
import CustomerRouter from './Customer/controller'
import OrderRouter from './Order/controller'
import ProductRouter from './Product/controller'
import ProductVersionRouter from './ProductVersion/controller'

export default function mainRouter(app: Express) {
    app.use('/brand',BrandRouter)
    app.use('/category',CategoryRouter)
    app.use('/customer',CustomerRouter)
    app.use('/order',OrderRouter)
    app.use('/product',ProductRouter)
    app.use('/product_version',ProductVersionRouter)
    return app;
}