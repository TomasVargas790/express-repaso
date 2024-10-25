import '../src/helper'
import { AppDataSource } from "@/db/connection/data-source"
import { Customer } from "@/db/entity/Customer"
import { Brand } from "@/db/entity/Brand"
import { Category } from "@/db/entity/Category"
import { Order } from "@/db/entity/Order"
import { Product } from "@/db/entity/Product"
import { ProductVersion } from "@/db/entity/ProductVersion"
import { OrderProduct } from '@/db/entity/OrderProduct'
//import { User } from "@/db/entity/User"

(async () => {
    try {
        await AppDataSource.initialize()
        await AppDataSource.getRepository(OrderProduct).delete({})
        await AppDataSource.getRepository(ProductVersion).delete({})
        await AppDataSource.getRepository(Product).delete({})
        await AppDataSource.getRepository(Order).delete({})
        await AppDataSource.getRepository(Brand).delete({})
        await AppDataSource.getRepository(Category).delete({})
        await AppDataSource.getRepository(Customer).delete({})
        logger.debug('[DELETED EVERY RECORD]')
    } catch (error) {
        logger.error('[ERROR DELETING EVERY RECORD]')
    } finally {
        process.exit(1)
    }
})();
