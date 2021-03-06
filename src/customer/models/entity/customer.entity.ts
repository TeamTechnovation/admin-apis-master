import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { tbOutlet } from "src/restaurant/models/entity/outlets.entity";
import { tbResturant } from "src/restaurant/models/entity/restaurant.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class tbCustomers {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id?: number

    @ApiProperty()
    @Column({nullable: true})
    fullname?: string

    @ApiProperty()
    @Column({nullable: true})
    email?: string

    @ApiProperty()
    @Column({nullable: true})
    phone?: string

    @ApiProperty()
    @ManyToOne(type => tbOutlet, outlet => outlet.id, {onDelete: "CASCADE"})
    outlet?: number

    @ManyToOne(type => tbResturant, restaurant => restaurant.id, {onDelete: "CASCADE"})
    restaurant?: number

    @ApiProperty()
    @Column({nullable: true})
    dob: Date

    @ApiProperty()
    @Column({nullable: true})
    doa: Date

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ApiProperty()
    @Column({nullable: true, default: true})
    flag?: boolean
}