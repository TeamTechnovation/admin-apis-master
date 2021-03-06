import { tbProductType } from "src/product/models/entity/productType.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { tbRestaurantFloor } from "./floor.entity";
import { tbRestaurantSection } from "./section.entityt";
import { tbTable } from "./table.entity";

@Entity()
export class tbRestaurantArea {
    @PrimaryGeneratedColumn()
    id?: number

    @Column({nullable: true})
    areaName?: string    

    @ManyToOne(type => tbRestaurantFloor, restaurant => restaurant.id,{nullable:true, onDelete: "CASCADE"})
    floor?: number

    @ManyToMany(type => tbProductType)
    @JoinTable({
        name: "area_and_product_types",
        joinColumn: {
            name: "area",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "type",
            referencedColumnName: "id"
        }
    })
    productTypes?: tbProductType[]

    @CreateDateColumn()
    createdAt?: Date

    @UpdateDateColumn()
    updatedAt?: Date

    @Column({nullable: true, default: true})
    status?: boolean 
    
    @OneToMany(type => tbRestaurantSection, sections => sections.area)
    sections?: tbRestaurantSection[]

    @OneToMany(type => tbTable, table => table.area)
    tables?: tbTable[]

    @Column({nullable: true})
    pax?: number
    
    @Column({nullable: true, default: false})
    hasSections?: boolean  
    
    @Column({nullable: true, default: true})
    flag?: boolean  
}