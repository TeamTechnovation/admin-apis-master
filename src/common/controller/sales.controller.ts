import { Controller, Get } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CommonService } from "../service/common.service";
@ApiTags("sales")
@Controller("sales")
export class SalesController {
    constructor(private readonly commonService: CommonService) {}
    @ApiResponse({ status: 200 })
    @Get()
    getAllSales() {
        return this.commonService.getAllSales()
    }
}