import { Column, Entity, UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn,OneToMany, ManyToMany, JoinTable } from "typeorm";
import { tbProduct } from "./product.entity";
import { ApiProperty } from "@nestjs/swagger";
import { tbResturant } from "src/restaurant/models/entity/restaurant.entity";
@Entity()
export class tbProductCategory {
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

    @ApiProperty()
    @OneToMany(type => tbProduct, product => product.id)
    products: tbProduct[]

    @ApiProperty()
    @Column({nullable: true, default: true})
    flag?: boolean

    @ApiProperty()
    @Column({nullable: true, default: true})
    isGlobal?: boolean

    @ManyToMany(type => tbResturant)
    @JoinTable({
        name:"product_category_and_restaurant",
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