import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm"
import { Customer } from "./Customer.js"
import { ProductVersion } from "./ProductVersion.js"

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

    @ManyToMany(() => ProductVersion)
    @JoinTable({name:'order_product'})
        products!: Relation<ProductVersion>[]
}

