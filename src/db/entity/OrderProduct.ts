import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm'
import { Order } from './Order'
import { ProductVersion } from './ProductVersion'

@Entity()
export class OrderProduct {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    quantity!: number

    @Column({ type: 'int' })
    @ManyToOne(() => Order/* , order => order.products */)
    order!: Relation<Order>

    @Column({ type: 'int' })
    @ManyToOne(() => ProductVersion/* , productVersion => productVersion.orders */)
    product!: Relation<ProductVersion>
}


