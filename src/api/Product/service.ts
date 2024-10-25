import { AppDataSource } from '@/db/connection/data-source';
import { Product } from '@/db/entity/Product';
import { CRUD } from '@/utils/crud';
import { Request, Response } from 'express';

const productRepository = AppDataSource.getRepository(Product)

export default class extends CRUD<Product> {

    constructor() {
        super(productRepository)
    }

    get(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined> {
        this.controller.getAll()
    }
}