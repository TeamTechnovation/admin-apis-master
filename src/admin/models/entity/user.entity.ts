import { Column, Entity, UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn, JoinColumn, ManyToOne, BeforeInsert, BeforeUpdate } from "typeorm";
import { tbRole } from "src/common/models/entity/roles.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail, MinLength, MaxLength, Min, Max, IsNumber, IsString } from "class-validator";
import { Exclude } from "class-transformer/decorators";
@Entity()
export class tbUser {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id?: number

    @ApiProperty()
    @Column({nullable: false})
    firstName?: string

    @ApiProperty()
    @Column({nullable: true})
    lastName?: string

    @ApiProperty()
    @Column({nullable: true, type:'timestamp'})
    lastSession?: Date

    @ApiProperty()    
    @Column({nullable: false }) 
    password?: string   

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    @Column({nullable: true})
    email?: string

    @ApiProperty()
    @Column({nullable: true})
    phone?: string

    @ApiProperty()
    @Column({nullable: true, default: "+91"})
    icp?: string

    @ApiProperty()
    @Column({nullable: true})
    profileSM?: string

    @ApiProperty()
    @Column({nullable: true})
    profileL?: string

    @ApiProperty()
    @Column({nullable: true, type:'text', array: true})
    addressLineOne?: [String]

    @ApiProperty()
    @Column({type: 'text',nullable: true})
    addressLineTwo?: String

    @ApiProperty()
    @Column({nullable: true, default: true})
    status?: boolean

    @ApiProperty()
    @UpdateDateColumn()
    updatedAt?: Date

    @ApiProperty()
    @CreateDateColumn({nullable: true})
    createdAt?: Date

    @ApiProperty()
    @Column({nullable: true, type: 'date'})
    joiningDate?: Date

    @ApiProperty()
    @ManyToOne(type => tbRole, role => role.id, {cascade: true})
    @JoinColumn()
    role?: number

    @ApiProperty()
    @Column({nullable: true, default: true})
    flag?: boolean
}