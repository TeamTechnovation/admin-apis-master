import { Controller, Get } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { PaymentGatewayService } from "../service/paymentGateway.service";
@ApiTags("paymentGateway")
@Controller('paymentGateway')
export class PaymentGatewayController {
    constructor(private readonly paymentGatewayService: PaymentGatewayService) {}
    @ApiResponse({ status: 200 })
    @Get()
    async getPaymentGateways(){
        return await this.paymentGatewayService.getAllPaymentGateway()
    }
}