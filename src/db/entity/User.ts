import 'reflect-metadata'
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class User {

    @PrimaryGeneratedColumn()
        id!: number

    @Column()
        firstName!: string

    @Column()
        lastName!: string

    @Column({ unique: true })
        email!: string

    @Column({ unique: true })
        phone!: string

    @Column()
        password!: string

}
