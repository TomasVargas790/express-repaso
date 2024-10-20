import { AppDataSource } from '@/db/connection/data-source';
import { User } from '@/db/entity/User';
import { CRUD } from '@/utils/crud';

const productVersionRepository = AppDataSource.getRepository(User)

export default class extends CRUD<User> {

    constructor() {
        super(productVersionRepository)
    }
}