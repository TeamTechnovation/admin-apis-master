
import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm";
import { tbWarehouseType } from "../entity/warehouseType.entity";
import { IType } from "./type.dto";

export class IWarehouse {
    @ApiProperty()
    id?: number
    @ApiProperty()
    name?: string
    @ApiProperty()
    alias?: string  
    @ApiProperty()
    addressLineOne?: [String]
    @ApiProperty()
    addressLineTwo?: String
    updatedAt?: Date
    createdAt?: Date
    @ApiProperty()
    status?: boolean
    @ApiProperty()
    warehouseType: tbWarehouseType
}