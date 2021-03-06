import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class tbRBACFeatures {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @Column()
    name: string

    @ApiProperty()
    @Column({nullable: true})
    description: string

    @ApiProperty()
    @Column({nullable: true, default: true})
    flag?: boolean
}