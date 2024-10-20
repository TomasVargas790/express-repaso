import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm'
import { Customer } from './Customer'
import { OrderProduct } from './OrderProduct'

type StatusType = 'PENDIENTE PAGO' | 'PENDIENTE ENTREGA' | 'PENDIENTE PAGO/ENTREGA' | 'FINALIZADO'

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    status!: StatusType

    @ManyToOne(() => Customer)
    customer!: Relation<Customer>

    /* @OneToMany(() => OrderProduct, orderProduct => orderProduct.order)
    products!: Relation<OrderProduct>[] */
}


