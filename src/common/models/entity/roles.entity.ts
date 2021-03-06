import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { tbRightOnFeature } from "src/common/models/entity/RightOnFeatures.entity";
import { tbUser } from "src/admin/models/entity/user.entity";
import { ApiProperty } from "@nestjs/swagger";
@Entity()
export class tbRole {
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
    @OneToMany(type => tbRightOnFeature, rights => rights.roleId)
    rbacFeaturesList: [tbRightOnFeature]

    @ApiProperty()
    @OneToMany(type => tbUser, user => user.role)
    users: [tbUser]

    @ApiProperty()
    @Column({nullable: true, default: true})
    flag?: boolean
}