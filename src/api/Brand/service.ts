import { Brand } from "@/db/entity/Brand";
import { CRUD } from "@/utils/crud";

import { AppDataSource } from "@/db/connection/data-source";

const BrandRepository = AppDataSource.getRepository(Brand)

export default class extends CRUD<Brand> {

    constructor() {
        super(BrandRepository)
    }
}