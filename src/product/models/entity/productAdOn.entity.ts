import { Column, Entity, UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { tbProduct } from "./product.entity";
@Entity()
export class tbProductAdon {
    constructor(obj) {
        obj && Object.assign(this, obj)
    }
    @PrimaryGeneratedColumn()
    id?: number

    @Column({ nullable: false }) 
    name?: string

    @Column({ nullable: true })
    alias?: string

    @Column({ nullable: true,type: "float"})
    price?: number

    @OneToMany(type => tbProduct, product => product.id,{nullable :true})
    product ?: string

    @Column({ nullable: true })
    tax?: number

    @UpdateDateColumn()
    updatedAt?: Date

    @CreateDateColumn({ nullable: true })
    createdAt?: Date

    @Column({ nullable: true , default: true})
    status?: boolean

}