import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { tbResturant } from "./restaurant.entity";

@Entity()
export class tbUploadedPosts {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: true})
    message: string

    @Column({type: 'text', array: true, nullable: true})
    platforms: string[]

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(type => tbResturant)
    restaurant: number
}