import { Column, Entity, UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn, JoinColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { tbItem } from "../entity/item.entity";
import { tbOutlet } from "src/restaurant/models/entity/outlets.entity";
import { IRawItem } from "./item.dto";
import { ApiProperty } from "@nestjs/swagger";

export class IVendor {
    @ApiProperty()
    id: number
    @ApiProperty()
    name?: string
    @ApiProperty()
    alias?:string
    @ApiProperty()
    email: string
    @ApiProperty()
    phone: string
    @ApiProperty()
    mobile: string
    @ApiProperty()
    addressLineOne?: [String] 
     @ApiProperty()
    addressLineTwo?: String

    updatedAt?: Date
    createdAt?: Date
    @ApiProperty()
    status?: boolean
    @ApiProperty()
    itemFor: tbItem[]
    @ApiProperty()
    itemForIds: [number]
    
}
