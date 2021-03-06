import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { tbResturant } from "./restaurant.entity";

@Entity()
export class tbRestaurantDocuments {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: true})
    fieldname: string

    @Column({nullable: true})
    filename: string

    @Column({nullable: true})
    createdUsing: number

    @ManyToOne(type => tbResturant)
    restaurant: number

    @CreateDateColumn()
    createdAt: Date

    @Column({nullable: true, default: true})
    flag: boolean

    @Column({nullable: true, default: true})
    status: boolean
}