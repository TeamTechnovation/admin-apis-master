import { tbProductCategory } from "src/product/models/entity/productCategory.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class tbRestaurantRoles {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: true})
    name: string

    @Column({nullable: true, default: true})
    status: boolean

    @ManyToOne(type => tbProductCategory, {nullable: true})
    productCategory: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}   