import { ApiProperty } from "@nestjs/swagger";
import { tbResturant } from "src/restaurant/models/entity/restaurant.entity";
import { Column, Entity, UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { tbItem } from "./item.entity";

@Entity()
export class tbItemCategory {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @Column({ nullable: false })
    name: string

    @ApiProperty()
    @Column({ nullable: true, default:"N/A" })
    alias?: string

    @UpdateDateColumn()
    updatedAt: Date

    @CreateDateColumn({ nullable: true })
    createdAt: Date

    @ApiProperty()
    @Column({ nullable: true , default: true})
    status: boolean

    // Item-Category
    @ApiProperty()
    @OneToMany(type => tbItem, item => item.category)
    items: [tbItem]

    @ApiProperty()
    @Column({nullable: true, default: true})
    flag?: boolean

    @ApiProperty()
    @Column({nullable: true, default: false})
    isGlobal?: boolean
    
    @ManyToMany(type => tbResturant)
    @JoinTable({
        name:"category_and_restaurant",
        joinColumn:{
            name: "category",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "restaurant",
            referencedColumnName: "id"
        }
    })
    restaurants: tbResturant[]
}