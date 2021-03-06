import { ApiProperty } from "@nestjs/swagger";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from "typeorm";
import { tbSubscription } from "./subscriptions.entity";

@Entity()
export class tbCoupons {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id?: number

    @ApiProperty()
    @Column()
    code: string

    @ApiProperty()
    @Column({nullable: true})
    amount?: number

    @ApiProperty()
    @Column({nullable: true})
    percent?: number

    @ApiProperty()
    @ManyToMany(type => tbSubscription, subs => subs.id, { eager: true, cascade: true })
    @JoinTable({
        name:'subscription_and_coupon',
        joinColumn:{
            name:'coupon',
            referencedColumnName:'id'
        },
        inverseJoinColumn:{
            name: 'subscription',
            referencedColumnName:'id'
        }
    })
    applicableFor?: tbSubscription[]

    applicableForIds?: number[]    

    @CreateDateColumn()
    createdAt?: Date

    @UpdateDateColumn()
    updatedAt?: Date

    @ApiProperty()
    @Column({nullable: true, default: false})
    isGlobal?: boolean

    @ApiProperty()
    @Column({nullable: true, default: true})
    flag?: boolean
}
