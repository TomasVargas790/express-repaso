import { AppDataSource } from '@/db/connection/data-source';
import { Customer } from '@/db/entity/Customer';
import { CRUD } from '@/utils/crud';

const customerRepository = AppDataSource.getRepository(Customer)

export default class extends CRUD<Customer> {

    constructor() {
        super(customerRepository)
    }
}