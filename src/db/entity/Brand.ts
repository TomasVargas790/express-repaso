import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm"
import { Product } from "./Product.js"

@Entity()
export class Brand {

    @PrimaryGeneratedColumn()
        id!: number

    @Column()
        name!: string

    @Column()
        code!: string

    @OneToMany(() => Product, (product) => product.brand)
        products!: Relation<Product>[]
}
