
import { ApiProperty } from "@nestjs/swagger";
import { tbSubscription } from "../entity/subscriptions.entity";
export class CouponDto {
    @ApiProperty()
    id ?: number
    @ApiProperty()
    code ?: string
    @ApiProperty()
    amount ?: number
    @ApiProperty()
    percent ?: number
    @ApiProperty()
    applicableFor ?: tbSubscription[]
    @ApiProperty()
    applicableForIds ?: [number] 

    createdAt ?: Date
    updatedAt ?: Date
}