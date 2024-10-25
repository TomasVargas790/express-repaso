
import { Product } from '../entity/Product'
import { Brand } from '../entity/Brand'
import { Category } from '../entity/Category'
import { User } from '../entity/User'
import { Customer } from '../entity/Customer'
import { ProductVersion } from '../entity/ProductVersion'
import { Order } from '../entity/Order'
import { OrderProduct } from '../entity/OrderProduct'
import { Migration1729401526096 } from '../migration/1729401526096-migration'
import { Migration1729401716093 } from '../migration/1729401716093-migration'


export const entities = [Product, ProductVersion, Brand, Category, User, Customer, Order, OrderProduct]

export const migrations = [Migration1729401526096, Migration1729401716093]