import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm"
import { Product } from "./Product.js"

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
        id!: number

    @Column()
        name!: string

    @Column()
        code!: string

    @OneToMany(() => Product, (product) => product.category)
        products!: Relation<Product>[]
}
