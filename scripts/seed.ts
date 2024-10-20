import { Brand } from '@/db/entity/Brand';
import '../src/helper'
import { AppDataSource } from "@/db/connection/data-source"
import { Category } from '@/db/entity/Category';
import { Customer } from "@/db/entity/Customer"
import { DeepPartial } from "typeorm"
import { Product } from '@/db/entity/Product';
import { ProductVersion } from '@/db/entity/ProductVersion';
import { Order } from '@/db/entity/Order';
import { OrderProduct } from '@/db/entity/OrderProduct';

(async () => {
  await AppDataSource.initialize()
  await AppDataSource.getRepository(Customer).insert([
    { id: 1, firstName: 'Tomas', lastName: 'Vargas', phone: '1123365060', email: 'tomiva1313@gmail.com' },
    { id: 2, firstName: 'Jaime', lastName: 'Vargas', phone: '1164236444', email: 'jevc1414@gmail.com' },
    { id: 3, firstName: 'Carolina', lastName: 'Hidalgo', phone: '1157276230', email: 'carolinahidalgo1414@gmail.com' },
    { id: 4, firstName: 'Facundo', lastName: 'Vargas', phone: '112265060', email: 'facundo@gmail.com' }
  ] as DeepPartial<Customer>[])

  logger.debug('[CUSTOMER INSERTED]')
  await AppDataSource.getRepository(Category).insert([
    { id: 1, name: 'Termicas', code: 'T' },
    { id: 2, name: 'Disyuntores', code: 'D' },
    { id: 3, name: 'Cable 1', code: 'C1' },
    { id: 4, name: 'Cable 1.5', code: 'C1.5' },
    { id: 5, name: 'Cable 2.5', code: 'C2.5' },
    { id: 6, name: 'Cable 4', code: 'C4' }
  ])
  logger.debug('[CATEGORY INSERTED]')

  await AppDataSource.getRepository(Brand).insert([
    { id: 1, name: 'Schenider', code: 'SC' },
    { id: 2, name: 'CHIN', code: 'CH' },
    { id: 3, name: 'Jeluz', code: 'JE' },
    { id: 4, name: 'SICA', code: 'SI' },
    { id: 5, name: 'ABB', code: 'ABB' },
    { id: 6, name: 'Pirelli', code: 'PI' }
  ])
  logger.debug('[BRAND INSERTED]')

  await AppDataSource.getRepository(Product).insert([
    { id: 1, name: 'Cable 1mm Pirelli', category: { id: 3 }, brand: { id: 6 }, stock: 1000, code: 'C1PI' },
    { id: 2, name: 'Cable 1.5mm Pirelli', category: { id: 4 }, brand: { id: 6 }, stock: 1000, code: 'C1.5PI' },
    { id: 3, name: 'Cable 2.5mm Pirelli', category: { id: 5 }, brand: { id: 6 }, stock: 1000, code: 'C2.5PI' },
    { id: 4, name: 'Termicas 2x40 Schenider', category: { id: 1 }, brand: { id: 1 }, stock: 20, code: 'TSC' },
    { id: 5, name: 'Termicas 2x40 CHIN', category: { id: 1 }, brand: { id: 2 }, stock: 18, code: 'TCH' },
    { id: 6, name: 'Termicas 2x40 ABB', category: { id: 1 }, brand: { id: 5 }, stock: 10, code: 'TABB' },
    { id: 7, name: 'Disyuntor 10mA Schenider', category: { id: 2 }, brand: { id: 1 }, stock: 16, code: 'DSC' },
    { id: 8, name: 'Disyuntor 10mA CHIN', category: { id: 2 }, brand: { id: 2 }, stock: 22, code: 'DCH' },
    { id: 9, name: 'Disyuntor 10mA ABB', category: { id: 2 }, brand: { id: 5 }, stock: 11, code: 'DABB' }
  ])
  logger.debug('[PRODUCTS INSERTED]')

  await AppDataSource.getRepository(ProductVersion).insert([
    { id: 1, product: { id: 1 }, price: 15000, },
    { id: 2, product: { id: 2 }, price: 20000, },
    { id: 3, product: { id: 3 }, price: 30000, },
    { id: 4, product: { id: 4 }, price: 3000, },
    { id: 5, product: { id: 5 }, price: 2000, },
    { id: 6, product: { id: 6 }, price: 2500, },
    { id: 7, product: { id: 7 }, price: 10000, },
    { id: 8, product: { id: 8 }, price: 8000, },
    { id: 9, product: { id: 9 }, price: 9000, }
  ])
  logger.debug('[PRODUCTVERSIONS INSERTED]')

  await AppDataSource.getRepository(Order).insert([
    { id: 1, customer: { id: 1 }, status: 'FINALIZADO', },
    { id: 2, customer: { id: 2 }, status: 'FINALIZADO', },
    { id: 3, customer: { id: 3 }, status: 'PENDIENTE PAGO', },
    { id: 4, customer: { id: 4 }, status: 'PENDIENTE PAGO/ENTREGA', }
  ])
  logger.debug('[ORDERS INSERTED]')


  await AppDataSource.getRepository(OrderProduct).insert([
    { id: 1, order: { id: 1 }, product: { id: 1 }, quantity: 100, },
    { id: 2, order: { id: 1 }, product: { id: 2 }, quantity: 200, },
    { id: 3, order: { id: 1 }, product: { id: 3 }, quantity: 200, },
    { id: 4, order: { id: 2 }, product: { id: 4 }, quantity: 2, },
    { id: 5, order: { id: 2 }, product: { id: 5 }, quantity: 3, },
    { id: 6, order: { id: 2 }, product: { id: 6 }, quantity: 2, },
    { id: 7, order: { id: 2 }, product: { id: 3 }, quantity: 200, },
    { id: 8, order: { id: 3 }, product: { id: 7 }, quantity: 1, },
    { id: 9, order: { id: 3 }, product: { id: 8 }, quantity: 1, },
    { id: 10, order: { id: 3 }, product: { id: 9 }, quantity: 1, },
    { id: 11, order: { id: 4 }, product: { id: 1 }, quantity: 200, },
    { id: 12, order: { id: 4 }, product: { id: 2 }, quantity: 200, },
    { id: 13, order: { id: 4 }, product: { id: 5 }, quantity: 2, },
    { id: 14, order: { id: 4 }, product: { id: 7 }, quantity: 3, },
    { id: 15, order: { id: 4 }, product: { id: 3 }, quantity: 200, }
  ])
  process.exit(1)

})();

/*




await queryInterface.bulkInsert('order_products', [
  { id: 1, order_id: 1, product_version_id: 1, quantity: 100,  },
  { id: 2, order_id: 1, product_version_id: 2, quantity: 200,  },
  { id: 3, order_id: 1, product_version_id: 3, quantity: 200,  },
  { id: 4, order_id: 2, product_version_id: 4, quantity: 2,  },
  { id: 5, order_id: 2, product_version_id: 5, quantity: 3,  },
  { id: 6, order_id: 2, product_version_id: 6, quantity: 2,  },
  { id: 7, order_id: 2, product_version_id: 3, quantity: 200,  },
  { id: 8, order_id: 3, product_version_id: 7, quantity: 1,  },
  { id: 9, order_id: 3, product_version_id: 8, quantity: 1,  },
  { id: 10, order_id: 3, product_version_id: 9, quantity: 1,  },
  { id: 11, order_id: 4, product_version_id: 1, quantity: 200,  },
  { id: 12, order_id: 4, product_version_id: 2, quantity: 200,  },
  { id: 13, order_id: 4, product_version_id: 5, quantity: 2,  },
  { id: 14, order_id: 4, product_version_id: 7, quantity: 3,  },
  { id: 15, order_id: 4, product_version_id: 3, quantity: 200,  }
], {})
  },

down: async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete('order_products', null, {})
  await queryInterface.bulkDelete('product_version', null, {})
  await queryInterface.bulkDelete('products', null, {})
  await queryInterface.bulkDelete('orders', null, {})
  await queryInterface.bulkDelete('categories', null, {})
  await queryInterface.bulkDelete('customers', null, {})
  await queryInterface.bulkDelete('brands', null, {})
} */


/*
price: 15000,
price: 20000,
price: 30000,
price: 3000,
price: 2000,
price: 2500,
price: 10000,
price: 8000,
price: 9000, */