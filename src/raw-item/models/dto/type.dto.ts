
import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToMany } from "typeorm";
export class IType {
    @ApiProperty()
    id?: number
    @ApiProperty()
    name?: string
    updatedAt?: Date
    createdAt?: Date
    @ApiProperty()
    status?: boolean

   
}