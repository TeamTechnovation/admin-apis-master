
import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class tbWarehouseType {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id?: number

    @ApiProperty()
    @Column({ nullable: false })
    name?: string

    @ApiProperty()
    @UpdateDateColumn() 
    updatedAt?: Date

    @ApiProperty()
    @CreateDateColumn({ nullable: true })
    createdAt?: Date
    
    @ApiProperty()
    @Column({ nullable: true, default: true })
    status?: boolean

    @ApiProperty()
    @Column({nullable: true, default: true})
    flag?: boolean
}