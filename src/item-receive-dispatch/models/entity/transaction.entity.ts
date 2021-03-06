import { ApiProperty } from "@nestjs/swagger";
import { tbResturant } from "src/restaurant/models/entity/restaurant.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { tbItemsInTransaction } from "./itemsInTransaction.entity";

@Entity()
export class tbTransaction {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id?: number 

    @ApiProperty()
    @Column({nullable: true})
    originId?: number

    @ApiProperty()
    @Column({nullable: true})
    amount?: number

    @ApiProperty()
    @Column({nullable: true})
    due?: number

    @ApiProperty()
    @Column({nullable: true})
    destinationId?: number

    @ApiProperty()
    @Column({nullable: true})
    originType?: string

    @ApiProperty()
    @Column({nullable: true})
    destinationType?: string

    @ApiProperty()
    @OneToMany(type => tbItemsInTransaction, item => item.transaction, {cascade: true})
    items?: tbItemsInTransaction[]

    @ApiProperty()
    @Column({nullable: true, type: "text"})
    remarks: string

    @ApiProperty()
    @CreateDateColumn()
    createdAt?: Date

    @ManyToOne(type => tbResturant)
    restaurant: number

    @ApiProperty()
    @UpdateDateColumn()
    updatedAt?: Date

    @ApiProperty()
    @Column({nullable: true, default: true})
    flag?: boolean
}