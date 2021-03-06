import { ApiProperty } from "@nestjs/swagger";
import { tbItem } from "src/raw-item/models/entity/item.entity";
import { tbOutlet } from "src/restaurant/models/entity/outlets.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class tbOutletStock {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number
    @ApiProperty()
    @Column({ nullable: true })
    quantity: number
    @ApiProperty()
    @ManyToOne(type => tbOutlet, { onDelete: "CASCADE" })
    outlet: number
    @ApiProperty()
    @ManyToOne(type => tbItem)
    item: number
    @ApiProperty()
    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ApiProperty()
    @Column({ nullable: true, default: true })
    flag?: boolean
}