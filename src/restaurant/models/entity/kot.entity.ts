import { tbProductGroup } from "src/product/models/entity/productGroup.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { tbRestaurantFloor } from "./floor.entity";
import { tbOutlet } from "./outlets.entity";
import { tbResturant } from "./restaurant.entity";

@Entity()
export class tbKot {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: true})
    name: string

    @Column()
    username: string

    @ManyToOne(type => tbResturant)
    restaurant: number

    @Column({nullable: true})
    restaurantId: number

    @ManyToOne(tupe => tbOutlet, {onDelete: "CASCADE"})
    outlet: number

    @Column({nullable: true})
    outletId: number

    @ManyToMany(type => tbProductGroup)
    @JoinTable({
        name: "kot_and_product_group",
        joinColumn: {
            name: "kot",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "group",
            referencedColumnName: "id"
        }
    })
    productGroup: tbProductGroup[]

    @ManyToMany(type => tbRestaurantFloor, floor => floor.kots)
    @JoinTable({
        name: "kot_and_floors",
        joinColumn: {
            name: "kot",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "floor",
            referencedColumnName: "id"
        }
    })
    floors: tbRestaurantFloor[]

    @Column()
    password: string

    @CreateDateColumn()
    createdAt: Date
}