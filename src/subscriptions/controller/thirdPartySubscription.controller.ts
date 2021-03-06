import { Controller, Get } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { ThirdPartyIntegrationService } from "../service/thirdPartyIntegration.service";
@ApiTags("thirdPartyIntegrations")
@Controller("thirdPartyIntegrations")
export class ThirdPartyIntegrationsController{
    constructor(private readonly thirdPartyIntegationSerive: ThirdPartyIntegrationService){}
    @ApiResponse({ status: 200 })
    @Get()
    async getIntegrations() {
        return await this.thirdPartyIntegationSerive.getAll()
    }
}