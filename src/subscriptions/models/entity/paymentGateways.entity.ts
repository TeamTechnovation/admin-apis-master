import { Column, PrimaryGeneratedColumn, Entity, Double, ManyToMany, JoinTable, OneToMany, JoinColumn } from "typeorm";
import { ObjectType, Field, ID, Float } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";

@ObjectType()
@Entity()
export class tbPaymentGateways {
    constructor(obj) {
        obj && Object.assign(this, obj)
    }
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @Column()
    name: string

    @ApiProperty()
    @Column({type: 'text', nullable: true})
    description: string

    @ApiProperty()
    @Column({type:'float8'})
    charges: Double

    @ApiProperty()
    @Column({type:'float8'})
    tax: Double

    @ApiProperty()
    @Column({nullable: true})
    image: string
    
    @ApiProperty()
    @Column({nullable: true, default: true})
    flag?: boolean
}