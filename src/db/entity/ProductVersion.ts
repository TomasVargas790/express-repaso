import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Relation, } from 'typeorm'
import { Product } from './Product'

@Entity()
export class ProductVersion {

    @PrimaryGeneratedColumn()
        id!: number

    @Column()
        price!: number

    @ManyToOne(() => Product, (product) => product.versions, { lazy: true })
        product!: Relation<Product>
}
