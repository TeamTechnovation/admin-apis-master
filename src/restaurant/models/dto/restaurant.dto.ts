import { ApiProperty } from "@nestjs/swagger"
import { OutletDto } from "./outlet.dto"

export class RestaurantDto {
    @ApiProperty()
    restuarantName?: string
    @ApiProperty()
    legalEntityName?: string
    @ApiProperty()
    restaurantEmail?: string
    @ApiProperty()
    password?: string
    @ApiProperty()
    addressLineOne?: [String]
    @ApiProperty()
    postalCode?: string
    @ApiProperty()
    restaurantType?: String
    @ApiProperty()
    icp?: string
    @ApiProperty()
    phone?: string
    @ApiProperty()
    website?: string
    @ApiProperty()
    customerName?: string
    @ApiProperty()
    customerEmail?: string
    @ApiProperty()
    restaurantIcp?: string
    @ApiProperty()
    restaurantPhone?: string
    @ApiProperty()
    billingFrom?: Date
    @ApiProperty()
    subscriptionId?: number
    @ApiProperty()
    discount?: String
    @ApiProperty()
    couponId?: number
    @ApiProperty()
    outlets?: OutletDto[]
    @ApiProperty()
    discountType?: String
    @ApiProperty()
    hasOutlets?: boolean
    amount?: number
}