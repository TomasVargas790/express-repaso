import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation, } from 'typeorm'
import { Product } from './Product'
import { Order } from './Order'
import { OrderProduct } from './OrderProduct'

@Entity()
export class ProductVersion {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    price!: number

    @ManyToOne(() => Product, (product) => product.versions, { lazy: true })
    product!: Relation<Product>

    /* @OneToMany(() => OrderProduct, orderProduct => orderProduct.product)
    orders!: Relation<OrderProduct>[] */
}
