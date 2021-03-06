import { tbResturant } from "src/restaurant/models/entity/restaurant.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export class PlatformData {
    name?: string
    url?: string
    platform_store_id?: string
}
@Entity()
export class tbStores {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    city: string

    @ManyToOne(type => tbResturant)
    restaurant: number

    @Column({nullable: true})
    name: string

    @Column({nullable: true})
    contact_phone: string

    @Column({nullable: true, array: true, type: "text"})
    notification_phones: string[]

    @Column({nullable: true})
    platform_data?: string;

    @Column({nullable: true, array: true, type: "text"})
    notification_emails: string[]

    @Column({nullable: true})
    reference: string

    @Column({nullable: true, default: false})
    status: boolean

    @CreateDateColumn()
    createdAt: Date
}