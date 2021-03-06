import { tbProductType } from "src/product/models/entity/productType.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { tbRestaurantArea } from "./area.entity";
import { tbTable } from "./table.entity";

@Entity()
export class tbRestaurantSection {
    @PrimaryGeneratedColumn()
    id?: number

    @Column({nullable: true})
    sectionName?: string
    
    @ManyToOne(type => tbRestaurantArea, area => area.id, {onDelete: "CASCADE", cascade: true})
    @JoinColumn({name: "areaId"})
    area?: number
    
    @ManyToMany(type => tbProductType, {onDelete: "CASCADE", cascade: true})
    @JoinTable({
        name: "section_and_product_types",
        joinColumn: {
            name: "section",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "type",
            referencedColumnName: "id"
        }
    })
    productTypes?: tbProductType[]

    @OneToMany(type => tbTable, table => table.section , {onDelete: "CASCADE", })
    tables?: tbTable[]

    @Column({nullable: true})
    pax?: number

    @Column({nullable: true})
    numberOfTables?: number

    @CreateDateColumn()
    createdAt?: Date

    @UpdateDateColumn()
    updatedAt?: Date

    @Column({nullable: true, default: true})
    status?: boolean  
    
    @Column({nullable: true, default: true})
    flag?: boolean
}