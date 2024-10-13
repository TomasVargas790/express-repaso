
import { Product } from '../entity/Product'
import { Brand } from '../entity/Brand'
import { Category } from '../entity/Category'
import { User } from '../entity/User'
import { Customer } from '../entity/Customer'
import { ProductVersion } from '../entity/ProductVersion'
import { Order } from '../entity/Order'

import { Migration1728852989478 } from '../migration/1728852989478-migration'

export const entities = [Product, ProductVersion, Brand, Category, User, Customer, Order,]

export const migrations = [Migration1728852989478]