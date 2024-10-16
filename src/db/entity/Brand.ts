import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm'
import { Product } from './Product'

@Entity()
export class Brand {

    @PrimaryGeneratedColumn()
        id!: number

    @Column({ unique: true })
        name!: string

    @Column({ unique: true })
        code!: string

    @OneToMany(() => Product, (product) => product.brand)
        products!: Relation<Product>[]
}
