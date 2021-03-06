import { tbCustomers } from "src/customer/models/entity/customer.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { tbOutlet } from "./outlets.entity";
import { tbResturant } from "./restaurant.entity";
import { tbTable } from "./table.entity";

@Entity()
export class tbBooking {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => tbCustomers)
    customer: number

    @Column({nullable: true})
    pax: number

    @Column({nullable: true, type: "time"})
    duration: string

    @ManyToMany(type => tbTable, table => table.id)
    @JoinTable({
        joinColumn:{
            name: "booking",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "table",
            referencedColumnName: "id"
        }
    })
    table: number[]

    @ManyToOne(type => tbResturant)
    restaurant: number

    @ManyToOne(type => tbOutlet)
    outlet: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}