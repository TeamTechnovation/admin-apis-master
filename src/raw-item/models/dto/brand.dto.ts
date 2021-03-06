import { ApiProperty } from "@nestjs/swagger"

export class IItemBrand{
    @ApiProperty()
    id?: number
    @ApiProperty()
    name?: string
    @ApiProperty()
    updatedAt?: Date
    createdAt?: Date
    @ApiProperty()
    status?: boolean

    
}