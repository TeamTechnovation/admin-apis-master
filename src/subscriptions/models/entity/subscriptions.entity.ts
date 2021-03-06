import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn, JoinTable, ManyToMany, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { tbPaymentGateways } from "./paymentGateways.entity";
import { tbThirdPartyIntregrations } from "./thirdPartyIntegration.entity";
@Entity()
export class tbSubscription {
    constructor(obj) {
        obj && Object.assign(this, obj)
    }
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id?: number

    @ApiProperty()
    @Column()
    name?: string

    @ApiProperty()
    @Column({ nullable: true })
    description?: string

    @ApiProperty()
    @Column({ nullable: true })
    amount?: number

    @ApiProperty()
    @Column({ nullable: true })
    maxRolesPerOutlet?: number

    @ApiProperty()
    @Column({ nullable: true })
    maxOutlets?: number

    @ApiProperty()
    @Column({ nullable: true })
    maxLoginPerAccount?: number

    @ApiProperty()
    @Column({ nullable: true })
    maxWaiterPerOutlet?: number

    @ApiProperty()
    @Column({ type: 'date', nullable: true })
    validFrom?: Date

    @ApiProperty()
    @Column({ type: 'date', nullable: true })
    validTill?: Date

    @ApiProperty()
    @Column({ nullable: true })
    planPeriod?: number

    @ApiProperty()
    @Column({ default: false })
    allowFullBackup?: boolean

    @ApiProperty()
    @Column({ default: false })
    allowOnlyLedgerBackup?: boolean

    @ApiProperty()
    @Column({ default: false })
    allowAttendance?: boolean

    @ApiProperty()
    @Column({ default: false })
    surveryAndNotifications?: boolean


    @Column({ default: false })
    appSupport?: boolean


    @Column({ default: false })
    thirdPartyIntegrations?: boolean


    @Column({ default: false })
    paymentGateways?: boolean


    @Column({ nullable: true, default: true })
    Status: boolean


    @ManyToMany(type => tbPaymentGateways)
    @JoinTable({
        name: 'subscription_and_paymentGateway',
        inverseJoinColumn: {
            name: 'paymentGateway',
            referencedColumnName: 'id'
        },
        joinColumn: {
            name: 'subscription',
            referencedColumnName: 'id'
        }
    })
    gateways: tbPaymentGateways[]

    gatewaysIds: number[]


    @ManyToMany(type => tbThirdPartyIntregrations)
    @JoinTable({
        name: 'subscription_and_integrations',
        inverseJoinColumn: {
            name: 'integration',
            referencedColumnName: 'id'
        },
        joinColumn: {
            name: 'subscription',
            referencedColumnName: 'id'
        }
    })
    integrations: tbThirdPartyIntregrations[]

    integrationsIds: number[]

    @UpdateDateColumn()
    updatedAt: Date


    @CreateDateColumn()
    createdAt: Date

    @ApiProperty()
    @Column({nullable: true, default: true})
    flag?: boolean
}