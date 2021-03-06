import { ApiProperty } from "@nestjs/swagger";
import { tbItem } from "src/raw-item/models/entity/item.entity";
import { tbResturant } from "src/restaurant/models/entity/restaurant.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { tbItemFromVendor } from "./itemFromVendor.entity";

@Entity()
export class tbVendor {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id?: number

    @ApiProperty()
    @Column({nullable: true, default: 0})
    pay: number

    @ApiProperty()
    @Column({nullable: true, default: 0})
    receive?: number
    
    @ApiProperty()
    @Column({nullable: true, default: "N/A"})
    fullname?: string

    @ApiProperty()
    @Column({nullable: true, default: "N/A"})
    email?: string

    @ApiProperty()
    @Column({nullable: true, default: "N/A"})
    phone?: string

    @ManyToOne(type => tbResturant)
    restaurant: number

    @ApiProperty()
    @Column({nullable: true, default: "N/A"})
    gstin? :string

    @ApiProperty()
    @ManyToMany(type => tbItemFromVendor, item => item.id, {cascade: true})
    @JoinTable({
        name:"vendor_and_item_from_vendor",
        joinColumn: {
            name: "vendor",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "item",
            referencedColumnName: "id"
        }
    })
    item?: tbItemFromVendor[]

    @ApiProperty()
    @Column({nullable: true, default: true})
    status?: boolean

    @CreateDateColumn()
    createdAt?: Date

    @UpdateDateColumn()
    updatedAt?: Date

    @ApiProperty()
    @Column({nullable: true, default: true})
    flag?: boolean
}