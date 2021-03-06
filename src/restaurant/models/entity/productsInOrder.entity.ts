import { tbProduct } from "src/product/models/entity/product.entity";
import { tbProductGroup } from "src/product/models/entity/productGroup.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { tbOrders } from "./orders.entity";

@Entity()
export class tbProductInOrder {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => tbProduct)
    product: number

    @ManyToOne(type => tbProductGroup)
    group: number

    @Column("text",{nullable: true, array: true, default: {}})
    addon: string[]

    @ManyToOne(type => tbOrders, {onDelete: "CASCADE"})
    order: number
}