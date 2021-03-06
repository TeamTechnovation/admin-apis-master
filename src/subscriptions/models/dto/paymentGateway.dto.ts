import { ApiProperty } from "@nestjs/swagger"
import { Double } from "typeorm"

export class PaymentDto{
    @ApiProperty()
    id?: number
    @ApiProperty()
    name?: string
    @ApiProperty()
    description?: string
    @ApiProperty()
    charges?: any
    @ApiProperty()
    tax?: any
    @ApiProperty()
    image?: string
}

