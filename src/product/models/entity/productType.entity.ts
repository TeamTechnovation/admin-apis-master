import { tbRestaurantFloor } from "src/restaurant/models/entity/floor.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class tbProductType {
    @PrimaryGeneratedColumn()
    id?: number

    @Column({nullable: true})
    name?: string

    @OneToMany(type => tbRestaurantFloor, floor => floor.id)
    @JoinColumn()
    floor?: tbRestaurantFloor[]
}