import "reflect-metadata"
import { DataSource } from "typeorm"
import { Product } from "./entity/Product.js"
import { Brand } from "./entity/Brand.js"
import { Category } from "./entity/Category.js"
import { User } from "./entity/User.js"
import { Customer } from "./entity/Customer.js"
import { ProductVersion } from "./entity/ProductVersion.js"
import { Order } from "./entity/Order.js"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "grandetuco1",
    database: "express-repaso",
    synchronize: true,
    logging: false,
    entities: [Product,ProductVersion,Brand, Category, User, Customer,   Order,],
    migrations: ["src/db/migration/**/*.{ts,js}"],
    subscribers: [],
})

console.log(AppDataSource)