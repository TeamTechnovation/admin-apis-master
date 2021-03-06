import { Column, PrimaryGeneratedColumn, Entity} from "typeorm";
import { ObjectType, Field, ID } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";


@Entity()
export class tbThirdPartyIntregrations {
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
    @Column({nullable: true, default: true})
    flag?: boolean 
}