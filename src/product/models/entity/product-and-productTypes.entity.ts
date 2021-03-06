import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { tbProduct } from "./product.entity";
import { tbProductType } from "./productType.entity";

@Entity()
export class tbProductAndProductType {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => tbProduct, { onDelete: "CASCADE" })
    product: number

    @ManyToOne(type => tbProductType, { onDelete: "CASCADE" })
    type: number

    @Column({default: true})
    status: boolean
}