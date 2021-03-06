import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { tbRestaurantArea } from "./area.entity";
import { tbBooking } from "./booking.entity";
import { tbRestaurantFloor } from "./floor.entity";
import { tbResturant } from "./restaurant.entity";
import { tbRestaurantSection } from "./section.entityt";

@Entity()
export class tbTable {
    @PrimaryGeneratedColumn()
    id?: number

    @Column({nullable: true})
    name: string

    @Column()
    type: string

    @Column({type: "double precision", nullable: true})
    top: number

    @Column({type: "double precision", nullable: true})
    left: number

    @ManyToOne(type => tbResturant)
    restaurant: number

    @ManyToOne(type => tbRestaurantFloor)
    floor: number

    @ManyToOne(type => tbRestaurantArea, {onDelete: "CASCADE"})
    area: number

    @ManyToOne(type => tbRestaurantSection, {onDelete: "CASCADE"})
    section: number

    @Column({nullable: true, default: false})
    canBookMultiple: boolean

    @Column({nullable: true, default: 1})
    bookingCapacity: number

    @OneToMany(type => tbBooking, booking => booking.table)
    @JoinColumn()
    booking: tbBooking[]
    
    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @Column({nullable: true, default: true})
    status: boolean

    @Column({nullable: true, default: true})
    flag: boolean
}