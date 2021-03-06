import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class tbRestaurantSales {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: true, type: "float"})
    openingBalance: number

    @Column({ nullable: true, type: "float"})
    closingBalance: number

    @Column({nullable: true})
    saleType: string
}