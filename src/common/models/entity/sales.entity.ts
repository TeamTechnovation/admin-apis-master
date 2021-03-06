import { ApiProperty } from "@nestjs/swagger";
import { tbResturant } from "src/restaurant/models/entity/restaurant.entity";
import { tbCoupons } from "src/subscriptions/models/entity/coupon.entity";
import { tbSubscription } from "src/subscriptions/models/entity/subscriptions.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class tbSales {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id?: number

    @ApiProperty()
    @ManyToOne(type => tbSubscription, subs => subs.id, { cascade: true ,})
    subscription?: number

    @ApiProperty()
    @ManyToOne(type => tbResturant, restaurant => restaurant.id, { cascade: true })
    restaurant?: number

    @ApiProperty()
    @ManyToOne(type => tbCoupons, coupon => coupon.id, { cascade: true })
    coupon?: number

    @ApiProperty()
    @Column({type: 'text', nullable: true, default:"N/A"})
    discount?: String

    @ApiProperty()
    @Column({nullable: true, default:"N/A"})
    discountType?: String

    @Column({nullable: true})
    orderId?: string
    
    @Column({nullable: true})
    paymentId?: string

    @ApiProperty()
    @Column({type: 'date', nullable: true})
    billingFrom?: Date

    @ApiProperty()
    @Column({nullable: true, default: true})
    flag?: boolean
}