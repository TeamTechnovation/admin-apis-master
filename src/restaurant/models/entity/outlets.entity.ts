import { ApiProperty } from "@nestjs/swagger";
import { tbProduct } from "src/product/models/entity/product.entity";
import { tbProductType } from "src/product/models/entity/productType.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { tbRestaurantFloor } from "./floor.entity";
import { tbResturant } from "./restaurant.entity";
@Entity()
export class tbOutlet{
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @Column({nullable: true})
    email: string

    @ApiProperty()
    @Column({nullable: true})
    alias: String

    @ApiProperty()
    @Column({type: 'text', array: true, nullable: true})
    addressLineOne: string[]

    @ApiProperty()
    @Column({nullable: true})
    addressLineTwo: string

    @ApiProperty()
    @Column({nullable: true})
    postalCode: string

    @ApiProperty()
    @Column({nullable: true})
    icp: string

    @ApiProperty()
    @Column({nullable: true})
    phone: string

    @Column({nullable: true, default:"N/A"})
    outletType: String

    @ApiProperty()
    @ManyToOne(type => tbResturant, restaurant => restaurant.id)
    @JoinColumn()
    restaurant: number

    @ManyToMany(type => tbProduct, product => product.id)
    @JoinTable({
        name: "outlets_and_products",
        joinColumn: {
            name: "outlet",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "product",
            referencedColumnName: "id"
        }
    })
    product: tbProduct[]

    @ManyToMany(type => tbProductType)
    @JoinTable({
        name: "product_type_and_outlet",
        joinColumn: {
            name: "outlet",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "type",
            referencedColumnName: "id"
        }
    })
    productType: tbProductType[]

    @OneToMany(type => tbRestaurantFloor, floor => floor.outlet, {onDelete: "CASCADE"})
    floors: tbRestaurantFloor[]

    @Column({default: "Rupees-Rs"})
    currency: string

    @ApiProperty()
    @Column({nullable: true, default: true})
    flag?: boolean
}