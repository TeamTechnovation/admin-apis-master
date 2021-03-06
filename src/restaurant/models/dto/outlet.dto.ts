import { ApiProperty } from "@nestjs/swagger"

export class OutletDto {
    @ApiProperty()
    id?: number
    @ApiProperty()
    alias?: String
    @ApiProperty()
    email?: string
    @ApiProperty()
    addressLineOne?: string[]
    @ApiProperty()
    addressLineTwo?: string
    @ApiProperty()
    postalCode?: string
    @ApiProperty()
    icp?: string
    @ApiProperty()
    restaurantIcp?: string
    @ApiProperty()
    phone?: string
    @ApiProperty()
    restaurant?: number
    @ApiProperty()
    key?: number
}