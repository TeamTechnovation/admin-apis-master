import { tbProductType } from "src/product/models/entity/productType.entity";
import { tbResturant } from "src/restaurant/models/entity/restaurant.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { tbRestaurantArea } from "./area.entity";
import { tbKot } from "./kot.entity";
import { tbOutlet } from "./outlets.entity";
import { tbTable } from "./table.entity";


@Entity()
export class tbRestaurantFloor {
    @PrimaryGeneratedColumn()
    id?: number

    @Column({nullable: true})
    number?: number

    @Column({nullable: true})
    floorName?: string

    @ManyToOne(type => tbResturant, restaurant => restaurant.id, {nullable:true})
    restaurant?: number

    @ManyToOne(type => tbOutlet, outlet => outlet.id, {nullable:true, onDelete: "CASCADE"})
    outlet?: number

    @OneToMany(type => tbRestaurantArea, area => area.floor)
    areas?: tbRestaurantArea[]

    @ManyToMany(type => tbProductType)
    @JoinTable({
        name: "floor_and_product_types",
        joinColumn: {
            name: "floor",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "type",
            referencedColumnName: "id"
        }
    })
    productTypes?: tbProductType[]

    @ManyToMany(type => tbKot, kot => kot.floors)
    kots?: tbKot[]

    @CreateDateColumn()
    createdAt?: Date

    @OneToMany(type => tbTable, table => table.floor)
    tables?: tbTable[]

    @Column({nullable: true})
    pax?: number

    @UpdateDateColumn()
    updatedAt?: Date

    @Column({nullable: true, default: true})
    status?: boolean  
    
    @Column({nullable: true, default: true})
    flag?: boolean   
}