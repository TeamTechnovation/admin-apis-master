import { ApiProperty } from "@nestjs/swagger";
import { tbItem } from "src/raw-item/models/entity/item.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { tbTransaction } from "./transaction.entity";

@Entity()
export class tbItemsInTransaction {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id?: number

    @ApiProperty()
    @ManyToOne(type => tbItem, item => item.id)
    @JoinColumn()
    item?: number

    @ApiProperty()
    @ManyToOne(type => tbTransaction, transaction => transaction.id, { onDelete: "CASCADE" })
    @JoinColumn()
    transaction?: number

    @ApiProperty()
    @Column({nullable: true})
    quantity?: number

    @ApiProperty()
    @CreateDateColumn()
    createdAt?: Date

    @ApiProperty()
    @UpdateDateColumn()
    updatedAt?: Date

    @ApiProperty()
    @Column({nullable: true, default: true})
    flag?: boolean
}