import { AppDataSource } from '@/db/connection/data-source';
import { Category } from '@/db/entity/Category';
import { CRUD } from '@/utils/crud';

const categoryRepository = AppDataSource.getRepository(Category)

export default class extends CRUD<Category> {

    constructor() {
        super(categoryRepository)
    }
}