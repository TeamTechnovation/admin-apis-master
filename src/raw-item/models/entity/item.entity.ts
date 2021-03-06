import { Column, Entity, UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm";
import { tbItemCategory } from "./itemCategory.entity";
import { tbItemBrand } from "./brand.entity";
import { tbUom } from "./uom.enitity";
import { tbItemGroup } from "./itemGroup.entity";
import { ApiProperty } from "@nestjs/swagger";
import { tbResturant } from "src/restaurant/models/entity/restaurant.entity";

@Entity()
export class tbItem {
    constructor(obj) {
        obj && Object.assign(this, obj)
    }
    @ApiProperty()
    @PrimaryGeneratedColumn() 
    id: number 
  
    @ApiProperty()
    @Column({default: "N/A"}) 
    name: string 

    @ApiProperty()
    @Column({ nullable: true,default: "N/A" })
    alias: string

    @ApiProperty()
    @Column({ nullable: true,default: "N/A" })
    description: string

    @Column({nullable: true})
    image: string

    @ApiProperty()
    @Column({ nullable: true,type: "float", })
    price: number

    @ApiProperty()
    @Column({ nullable: true })
    alertQty: number
    
    @ApiProperty()
    @Column({ nullable: true })
    tax: number

    @ApiProperty()
    @ManyToOne(type => tbResturant)
    restaurant: number

    @UpdateDateColumn()
    updatedAt: Date

    @CreateDateColumn({ nullable: true })
    createdAt: Date

    @ApiProperty()
    @Column({ nullable: true , default: true})
    status: boolean

    @ApiProperty()
    @ManyToOne(type => tbItemGroup, group =>group.id, {cascade: true})
    @JoinColumn()
    group: number

    @ApiProperty()
    @ManyToOne(type => tbItemBrand, brand =>brand.id, {cascade: true})
    @JoinColumn()
    brand: number

    @ApiProperty()
    @ManyToOne(type => tbItemCategory, category =>category.id, {cascade: true})
    @JoinColumn()
    category: number

    @ApiProperty()
    @ManyToOne(type => tbUom, uom =>uom.id, {cascade: true})
    @JoinColumn()
    uom: number

    @ApiProperty()
    @Column({nullable: true, default: true})
    flag?: boolean
}