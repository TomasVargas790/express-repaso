import { AppDataSource } from '@/db/connection/data-source';
import { Order } from '@/db/entity/Order';
import { CRUD } from '@/utils/crud';

const orderRepository = AppDataSource.getRepository(Order)

export default class extends CRUD<Order> {

    constructor() {
        super(orderRepository)
    }
}