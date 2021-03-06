import { ApiProperty } from "@nestjs/swagger"

export class IRawItem {
    @ApiProperty()
    id: number
    @ApiProperty()
    name?: string
    @ApiProperty()
    alias?:string
    @ApiProperty()
    price: number
    @ApiProperty()
    tax: number
    @ApiProperty()
    description?:string
    @ApiProperty()
    updatedAt?: Date
    createdAt?: Date
    @ApiProperty()
    status?: boolean
    @ApiProperty()
    group: number
    @ApiProperty()
    brand: number
    @ApiProperty()
    category: number
    @ApiProperty()
    uom: number

    
   
}