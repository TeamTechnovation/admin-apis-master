import { ApiProperty } from "@nestjs/swagger";
import { tbResturant } from "src/restaurant/models/entity/restaurant.entity";
import { Column, Entity, UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn, OneToMany, JoinColumn } from "typeorm";
import { tbProduct } from "./product.entity";
@Entity()
export class tbProductGroup {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @Column({ nullable: false })
    name: string

    @ApiProperty()
    @Column({ nullable: true })
    alias: string   

    @ApiProperty()
    @UpdateDateColumn()
    updatedAt: Date

    @ApiProperty()
    @CreateDateColumn({ nullable: true })
    createdAt: Date

    @ApiProperty()
    @Column({ nullable: true })
    status: boolean

    // Productgroup--product
    @ApiProperty()
    @OneToMany(type => tbProduct, product => product.productGroup)
    products: tbProduct[]
    
    @ApiProperty()
    @Column({nullable: true, default: true})
    flag?: boolean

    @OneToMany(type => tbResturant, restaurant => restaurant.productGroup)
    @JoinColumn()
    restaurant: tbResturant[]

    @ApiProperty()
    @Column({nullable: true, default: false})
    isGlobal?: boolean
}