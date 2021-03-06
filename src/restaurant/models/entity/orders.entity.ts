import { tbCustomers } from "src/customer/models/entity/customer.entity";
import { tbProductCategory } from "src/product/models/entity/productCategory.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { tbRestaurantArea } from "./area.entity";
import { tbRestaurantFloor } from "./floor.entity";
import { tbOutlet } from "./outlets.entity";
import { tbProductInOrder } from "./productsInOrder.entity";
import { tbResturant } from "./restaurant.entity";
import { tbRestaurantSection } from "./section.entityt";
import { tbTable } from "./table.entity";

enum PaymentModes {
    ATMCARD = "ATMCARD",
    CASH = "CASH",
    EWALLET = "EWALLET"
}
@Entity()
export class tbOrders {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => tbRestaurantFloor)
    floor: number

    @ManyToOne(type => tbRestaurantSection, {onDelete: "CASCADE"})
    section: number

    @ManyToOne(type => tbRestaurantArea)
    area: number

    // @ManyToOne(type => tbProductCategory)
    // category: number

    @OneToMany(type => tbProductInOrder, product => product.order, {cascade: true})
    productInOrder: tbProductInOrder[]

    @ManyToOne(type => tbCustomers)
    customer: number

    @ManyToOne(type => tbOutlet)
    outlet: number

    @ManyToOne(type => tbResturant)
    restaurant: number

    @ManyToOne(type => tbTable, {nullable: true, onDelete: "CASCADE"})
    table: number

    @CreateDateColumn()
    createdAt: Date

    //DUE CANCELED PAID
    @Column({nullable: true})
    paymentStatus: string

    @Column({nullable: true})
    paymentMode: PaymentModes

    @Column({nullable: true})
    total: string

    @Column({nullable: true})
    subTotal: string

    @Column({nullable: true})
    tax: string

    @Column({nullable: true})
    discount: string
}