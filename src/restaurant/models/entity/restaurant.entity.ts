import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToMany, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { tbOutlet } from "./outlets.entity";
import { OutletDto } from "../dto/outlet.dto";
import { tbProduct } from "src/product/models/entity/product.entity";
import { ApiProperty } from "@nestjs/swagger";
import { tbItemBrand } from "src/raw-item/models/entity/brand.entity";
import { tbItemCategory } from "src/raw-item/models/entity/itemCategory.entity";
import { tbItemGroup } from "src/raw-item/models/entity/itemGroup.entity";
import { tbUom } from "src/raw-item/models/entity/uom.enitity";
import { tbProductCategory } from "src/product/models/entity/productCategory.entity";
import { tbProductGroup } from "src/product/models/entity/productGroup.entity";
import { tbProductSize } from "src/product/models/entity/productSize.entity";
import { tbRestaurantDocuments } from "./documents.entity";
import { tbProductType } from "src/product/models/entity/productType.entity";
import { tbRestaurantFloor } from "./floor.entity";
import { tbSubscription } from "src/subscriptions/models/entity/subscriptions.entity";
import { tbStores } from "src/aggregators/models/entity/stores.entity";
@Entity()
export class tbResturant {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: true})
    createdUsing: number

    @ApiProperty()
    @Column({nullable: true, default:"N/A"})
    restuarantName: string 

    @ApiProperty()
    @Column({nullable: true, default:"N/A"})
    legalEntityName: string   

    @ApiProperty()
    @Column({nullable: true, default:"N/A"})
    restaurantEmail: string

    @ApiProperty()
    @Column({nullable: true, type: "text", default:"N/A"})
    password: string

    @ApiProperty()
    @Column({type: 'text', array: true, nullable: true})
    addressLineOne: [String]

    @ApiProperty()
    @Column({nullable: true, default:"N/A"})
    addressLineTwo: string

    @ApiProperty()
    @Column({nullable: true, default:"N/A"})
    postalCode: string

    @ApiProperty()
    @Column({nullable: true, default:"N/A"})
    restaurantType: String

    @ApiProperty()
    @Column({nullable: true, default:"N/A"})
    icp: string

    @ApiProperty()
    @Column({nullable: true, default:"N/A"})
    phone: string

    @ApiProperty()
    @Column({nullable: true, default:"N/A"})
    website: string

    @ApiProperty()
    @Column({nullable: true, default:"N/A"})
    customerName: string

    @ApiProperty()
    @Column({nullable: true, default:"N/A"})
    customerEmail: string

    @ApiProperty()
    @Column({nullable: true, default:"N/A"})
    restaurantIcp: string

    @ApiProperty()
    @Column({nullable: true, default:"N/A"})
    sendMail: string

    @ApiProperty()
    @Column({nullable: true, default:"N/A"})
    restaurantPhone: string

    @ApiProperty()
    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ApiProperty()
    @OneToMany(type => tbOutlet, outlet => outlet.restaurant)
    outlets: OutletDto[]

    @OneToMany(type => tbProduct, product => product.restaurant)
    products: tbProduct[]

    @OneToMany(type => tbStores, store => store.restaurant)
    stores: tbStores[]

    @ApiProperty()
    @Column({nullable: true})
    hasOutlets: boolean
    
    @ApiProperty()
    @Column({nullable: true, default: true})
    Status: boolean

    @ApiProperty()
    @Column({nullable: true, default: true})
    flag?: boolean

    @ApiProperty()
    @OneToMany(type => tbItemBrand, brand => brand.id)
    @JoinColumn()
    brand?: tbItemBrand[]

    @ApiProperty()
    @OneToMany(type => tbItemCategory, category => category.id)
    @JoinColumn()
    category?: tbItemCategory[]

    @ApiProperty()
    @OneToMany(type => tbItemGroup, group => group.id)
    @JoinColumn()
    group?: tbItemGroup[]

    @ApiProperty()
    @OneToMany(type => tbUom, uom => uom.id)
    @JoinColumn()
    uom?: tbUom[]
 
    @ApiProperty()
    @OneToMany(type => tbProductCategory, category => category.id)
    @JoinColumn()
    productCategory?: tbProductCategory[]

    @ApiProperty()
    @ManyToMany(type => tbProductGroup, group => group.restaurant)
    @JoinTable({
        name:"product_group_and_restaurant",
        joinColumn:{
            name: "restaurant",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "product",
            referencedColumnName: "id"
        }
    })
    productGroup?: tbProductGroup[]

    @ApiProperty()
    @OneToMany(type => tbProductSize, size => size.id)
    @JoinColumn()
    productSize?: tbProductSize[]

    @ManyToMany(type => tbProductType)
    @JoinTable({
        name: "product_type_and_restaurant",
        joinColumn: {
            name: "restaurant",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "type",
            referencedColumnName: "id"
        }
    })
    productType: tbProductType[]

    @OneToMany(type => tbRestaurantFloor, floor => floor.restaurant)
    floors: tbRestaurantFloor[]

    @OneToMany(type => tbRestaurantDocuments, document => document.restaurant, {cascade: true})
    documents: tbRestaurantDocuments[]

    @ManyToOne(type => tbSubscription)
    subscription: number

    @Column({nullable: true})
    subsExp: Date

    @Column({nullable: true})
    billingFrom: Date

    @Column({nullable: true})
    facebookAccessToken: string

    @Column({nullable: true})
    linkedInAccessToken: string
}