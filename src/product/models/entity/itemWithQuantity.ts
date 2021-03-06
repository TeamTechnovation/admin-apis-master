import { ApiProperty } from "@nestjs/swagger";
import { tbItem } from "src/raw-item/models/entity/item.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { tbProduct } from "./product.entity";

@Entity()
export class tbItemWithQuantity {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id?: number

    @ApiProperty()
    @ManyToOne(type => tbProduct, item => item.id, { onDelete: "CASCADE" })
    @JoinColumn()
    product?: number

    @ApiProperty()
    @ManyToOne(type => tbItem, item => item.id, { cascade: true, onDelete: "CASCADE" })
    item?: number

    @Column({ nullable: true })
    itemId?: number

    @ApiProperty()
    @Column()
    quantity?: number

    @ApiProperty()
    @CreateDateColumn()
    createdAt?: Date

    @ApiProperty()
    @UpdateDateColumn()
    updatedAt?: Date

    @ApiProperty()
    @Column({ nullable: true, default: true })
    flag?: boolean
}