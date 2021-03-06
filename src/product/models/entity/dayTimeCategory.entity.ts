import { tbOutlet } from "src/restaurant/models/entity/outlets.entity";
import { tbResturant } from "src/restaurant/models/entity/restaurant.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { tbProduct } from "./product.entity";

@Entity()
export class tbDayTimeCategory{
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: true})
    name: string

    @Column({nullable: true, type:"time"})
    fromTime: string

    @Column({nullable: true, type:"time"})
    toTime: string

    @ManyToOne(type => tbResturant)
    restaurants: tbResturant[]

    @ManyToOne(type => tbOutlet, {onDelete: "CASCADE"})
    outlets: tbOutlet[]

    @Column({nullable: true, default: false})
    isGlobal: boolean

    @Column({ nullable: true })
    status: boolean

    @Column({nullable: true, default: true})
    flag?: boolean

    @ManyToMany(type => tbProduct, product => product.dayTime)
    @JoinTable({
        name: "product_and_day_time",
        joinColumn: {
            name: "dayTime",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "product",
            referencedColumnName: "id"
        }
    })
    products: tbProduct[]
}