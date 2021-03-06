import { ApiProperty } from "@nestjs/swagger";
import { tbItem } from "src/raw-item/models/entity/item.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class tbItemFromVendor {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @ManyToOne(type => tbItem, item => item.id, {cascade: true})
    item?: number

    @ApiProperty()
    @Column({nullable: true})
    price?: number

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