import { ApiProperty } from "@nestjs/swagger"
import { PaymentDto } from "./paymentGateway.dto"
import { ThirdPartyIntegrationDto } from "./thirdPartyIntegration.dto"

export class SubscriptionDto {
    @ApiProperty()
    id: number
    @ApiProperty()
    name?: string
    @ApiProperty()
    description?: string
    @ApiProperty()
    amount?: number
    @ApiProperty()
    maxRolesPerOutlet?: number
    @ApiProperty()
    maxOutlets?: number
    @ApiProperty()
    maxLoginPerAccount?: number
    @ApiProperty()
    maxWaiterPerOutlet?: number
    @ApiProperty()
    validFrom?: Date
    @ApiProperty()
    validTill?: Date
    @ApiProperty()
    planPeriod?: number
    @ApiProperty()
    allowFullBackup?: boolean
    @ApiProperty()
    allowOnlyLedgerBackup?: boolean
    @ApiProperty()
    allowAttendance?: boolean
    @ApiProperty()
    surveryAndNotifications?: boolean
    @ApiProperty()
    appSupport?: boolean
    @ApiProperty()
    thirdPartyIntegrations?: boolean
    @ApiProperty()
    paymentGateways?: boolean
    @ApiProperty()
    gatewaysIds?: [number]
    @ApiProperty()
    integationIds?: [number]
    @ApiProperty()
    gateways?: PaymentDto[]
    @ApiProperty()
    integations?: ThirdPartyIntegrationDto[]





}

