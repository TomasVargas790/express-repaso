import { AppDataSource } from "@/db/connection/data-source";
import { Product } from "@/db/entity/Product";
import { CRUD } from "@/utils/crud";

const productRepository = AppDataSource.getRepository(Product)

export default class extends CRUD<Product> {

    constructor() {
        super(productRepository)
    }
}