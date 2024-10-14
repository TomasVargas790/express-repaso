import { AppDataSource } from "@/db/connection/data-source";
import { ProductVersion } from "@/db/entity/ProductVersion";
import { CRUD } from "@/utils/crud";

const productVersionRepository = AppDataSource.getRepository(ProductVersion)

export default class extends CRUD<ProductVersion> {

    constructor() {
        super(productVersionRepository)
    }
}