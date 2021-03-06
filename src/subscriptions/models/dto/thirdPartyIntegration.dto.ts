import { ApiProperty } from "@nestjs/swagger"

export class ThirdPartyIntegrationDto{
    @ApiProperty()
    id?: number
    @ApiProperty()
    name?: string
    @ApiProperty()
    description?: string
}