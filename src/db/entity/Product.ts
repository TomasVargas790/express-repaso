import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm'
import { Category } from './Category'
import { Brand } from './Brand'
import { ProductVersion } from './ProductVersion'

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column({ unique: true })
    code!: string

    @Column()
    stock!: number

    @ManyToOne(() => Category, category => category.products)
    category!: Relation<Category>

    @ManyToOne(() => Brand, brand => brand.products)
    brand!: Relation<Brand>

    @OneToMany(() => ProductVersion, version => version.product)
    versions!: Relation<ProductVersion>[]
}
