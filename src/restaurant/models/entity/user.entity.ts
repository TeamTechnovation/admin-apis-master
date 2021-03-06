import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { tbOutlet } from "./outlets.entity";
import { tbResturant } from "./restaurant.entity";
import { tbRestaurantRoles } from "./roles.entity";

@Entity()
export class tbRestaurantUser {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: true})
    fullname: string

    @Column({nullable: true, default: "N/A"})
    email: string

    @Column({nullable: true, default: "N/A"})
    phone: string

    @ManyToOne(type => tbResturant, restaurant => restaurant.id)
    restaurant: tbResturant

    @ManyToOne(type => tbOutlet, outlet => outlet.id, {onDelete: "CASCADE"})
    outlet: tbOutlet

    @ManyToOne(type => tbRestaurantRoles, role => role.id)
    role: number

    @Column({nullable: true})
    password: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}