import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm'
import { Customer } from './Customer'
import { ProductVersion } from './ProductVersion'

type StatusType = 'PENDIENTE PAGO' | 'PENDIENTE ENTREGA' | 'PENDIENTE PAGO/ENTREGA' | 'FINALIZADO'

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
        id!: number

    @Column()
        status!: StatusType

    @Column()
        code!: string

    @ManyToOne(() => Customer)
        customer!: Relation<Customer>

    @ManyToMany(() => ProductVersion,{cascade:true})
    @JoinTable({name:'order_product'})
        products!: Relation<ProductVersion>[]
}

