
import { Column, Entity, UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm";
import { tbWarehouseType } from "src/raw-item/models/entity/warehouseType.entity";
import { ApiProperty } from "@nestjs/swagger";
import { tbResturant } from "src/restaurant/models/entity/restaurant.entity";

@Entity()
export class tbWarehouse {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id?: number

    @ApiProperty()
    @Column({ nullable: false })
    name?: string

    @ApiProperty()
    @Column({ nullable: true })
    alias?: string  

    @ApiProperty()
    @Column({nullable: true, type:'text', array: true})
    addressLineOne?: [String]

    @ApiProperty()
    @Column({type: 'text',nullable: true})
    addressLineTwo?: String

    @ApiProperty()
    @UpdateDateColumn()
    updatedAt?: Date

    @ApiProperty()
    @CreateDateColumn({ nullable: true })
    createdAt?: Date

    @ApiProperty()
    @Column({ nullable: true , default: true})
    status?: boolean 

    @ApiProperty()
    @ManyToOne(type => tbResturant)
    restaurant?: number 
    
    @ApiProperty()
    @ManyToOne(type => tbWarehouseType, type => type.id, {cascade: true})
    @JoinColumn()
    type?: number

    @ApiProperty()
    @Column({nullable: true, default: true})
    flag?: boolean
}