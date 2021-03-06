import { Column, Entity, UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { tbProductCategory } from "./productCategory.entity";
import { tbProductGroup } from "./productGroup.entity";
import { tbProductSize } from "./productSize.entity";
import { tbItemWithQuantity } from "./itemWithQuantity";
import { tbResturant } from "src/restaurant/models/entity/restaurant.entity";
import { ApiProperty } from "@nestjs/swagger";
import { tbDayTimeCategory } from "./dayTimeCategory.entity";

@Entity()
export class tbProduct {
    constructor(obj) {
        obj && Object.assign(this, obj)
    }
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id?: number

    @ManyToOne(type => tbResturant, restaurant => restaurant.id)
    restaurant: number

    @ApiProperty()
    @Column({ nullable: false }) 
    name: string

    @ApiProperty()
    @Column({ nullable: true })
    alias: string

    @ApiProperty()
    @Column({ nullable: true ,type: "float"})
    basePrice: number
      
    @ApiProperty()
    @Column({ nullable: true })
    description: string
   
    @ApiProperty()
    @Column({ nullable: true,type: "float"})
    price: number

    @ApiProperty()
    @Column({ nullable: true,type: "float", default: 0.0})
    tax: number

    @ApiProperty()
    @UpdateDateColumn()
    updatedAt?: Date

    @ApiProperty()
    @CreateDateColumn({ nullable: true })
    createdAt?: Date

    @ApiProperty()
    @Column({ nullable: true })
    status: boolean

    @ApiProperty()
    @ManyToOne(type => tbProductCategory, cat => cat.id)
    @JoinColumn()
    productCategory:number 

    @ApiProperty()
    @ManyToOne(type => tbProductGroup, group => group.id, {cascade: true})
    @JoinColumn()
    productGroup:number 

    @Column("integer",{nullable: true, array: true, default: {}})
    addOns:number[]

    @Column({nullable: true})
    image: string

    @ApiProperty()
    @ManyToOne(type => tbProductSize, size => size.id, {cascade: true})
    @JoinColumn()
    productSize:number 

    @ManyToOne(type => tbDayTimeCategory, {nullable: true})
    dayTime: number

    @ApiProperty()
    @OneToMany(type => tbItemWithQuantity, item => item.product, {cascade: true})
    items?: tbItemWithQuantity[]

    @ApiProperty()
    @Column({nullable: true, default: true})
    flag?: boolean

    //not a column...
    productType?: number
}