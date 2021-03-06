import { ApiProperty } from "@nestjs/swagger";
import { tbResturant } from "src/restaurant/models/entity/restaurant.entity";
import { Column, Entity, UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { tbItem } from "./item.entity";

@Entity()
export class tbItemBrand{
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id?: number

    @ApiProperty()
    @Column({ nullable: false })
    name?: string
    
    @ApiProperty()
    @Column({ nullable: true, default:"N/A" })
    alias?: string

    @UpdateDateColumn() 
    updatedAt?: Date

    @CreateDateColumn({ nullable: true })
    createdAt?: Date

    @ApiProperty()
    @Column({ nullable: true, default: true})
    status?: boolean

    //category-Item
    @ApiProperty()
    @OneToMany(type => tbItem, item => item.brand)
    items?: [tbItem]

    @ApiProperty()
    @Column({nullable: true, default: true})
    flag?: boolean

    @ApiProperty()
    @Column({nullable: true, default: false})
    isGlobal?: boolean

    @ManyToMany(type => tbResturant)
    @JoinTable({
        name:"brand_and_restaurant",
        joinColumn:{
            name: "brand",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "restaurant",
            referencedColumnName: "id"
        }
    })
    restaurants: tbResturant[]
}