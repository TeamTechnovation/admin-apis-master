import { ApiProperty } from "@nestjs/swagger";
import { tbItem } from "src/raw-item/models/entity/item.entity";
import { tbWarehouse } from "src/raw-item/models/entity/warehouse.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class tbWarehouseStock {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @Column({nullable: true})
    quantity: number

    @ApiProperty()
    @ManyToOne(type => tbWarehouse)
    warehouse: number
    
    @ApiProperty()
    @ManyToOne(type => tbItem)
    item: number

    @ApiProperty()
    @CreateDateColumn()
    createdAt: Date

    @ApiProperty()
    @UpdateDateColumn()
    updatedAt: Date

    @ApiProperty()
    @Column({nullable: true, default: true})
    flag?: boolean
}