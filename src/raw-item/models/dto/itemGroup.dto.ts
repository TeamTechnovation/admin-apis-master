import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToMany } from "typeorm";
export class IItemGroup {
    @ApiProperty()
    id?: number
    @ApiProperty()
    name?: string
    @ApiProperty()
    alias?: string  
    @ApiProperty() 
    updatedAt?: Date
    createdAt?: Date
    @ApiProperty()
    status?: boolean

  
}