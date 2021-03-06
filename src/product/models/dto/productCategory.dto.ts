import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToMany } from "typeorm";

export class IProductCategory {

    @ApiProperty()
    id?: number

    @ApiProperty()
    name?: string

    @ApiProperty()
    alias?: string

    @ApiProperty()
    updatedAt?: Date

    @ApiProperty()
    createdAt?: Date

    @ApiProperty()
    status?: boolean

}