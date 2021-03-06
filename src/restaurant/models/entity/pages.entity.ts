import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { tbResturant } from "./restaurant.entity";

@Entity()
export class tbSocialPage{
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: true})
    name: string

    @Column({nullable: true})
    type: string

    @Column({nullable: true})
    pageId: string

    @Column({nullable: true})
    group: string

    @Column({nullable: true})
    accessToken: string

    @ManyToOne(type => tbResturant)
    @JoinColumn()
    restaurant: number

    @CreateDateColumn()
    createdAt: Date
}