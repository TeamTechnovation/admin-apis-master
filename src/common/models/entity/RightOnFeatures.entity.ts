import { Entity, PrimaryGeneratedColumn, OneToOne, Column } from "typeorm";
import { tbRole } from "./roles.entity";
import { tbRBACFeatures } from "./RBAC_features.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class tbRightOnFeature {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @OneToOne(type => tbRole, role => role.id)
    roleId: number

    @ApiProperty()
    @OneToOne(type => tbRBACFeatures, rbacFeature => rbacFeature.id)
    rbacFeatureId: number

    @ApiProperty()
    @Column({nullable: true, default: true})
    flag?: boolean
}