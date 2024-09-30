import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm"
import { Category } from "./Category.js"
import { Brand } from "./Brand.js"
import { ProductVersion } from "./ProductVersion.js"

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
        id!: number

    @Column()
        name!: string

    @Column()
        code!: string

    @ManyToOne(() => Category, category => category.products)

        category!: Relation<Category>

    @ManyToOne(() => Brand, brand => brand.products)
        brand!: Relation<Brand>

    @OneToMany(() => ProductVersion, version => version.product)
        versions!: Relation<ProductVersion>[]
}
