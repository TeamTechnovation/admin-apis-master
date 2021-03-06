import { ApiProperty } from '@nestjs/swagger'
import { tbResturant } from 'src/restaurant/models/entity/restaurant.entity'
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToOne } from 'typeorm'

@Entity()
export class tbSubscriptionSales {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @Column()
    subscriptionId: number

    @ApiProperty()
    @Column()
    subscriptionAmount: number

    @ManyToOne(type => tbResturant)
    restaurant: number

    @Column({nullable: true})
    billingFrom: Date

    @ApiProperty()
    @Column({nullable: true, default: true})
    flag?: boolean
}