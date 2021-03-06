import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { tbOutletStock } from '../models/entity/outlet.entity';
import { tbWarehouseStock } from '../models/entity/warehouse.entity';
import { StockService } from '../service/stock.service';
@ApiTags("stock")
@Controller('stock')
export class StockController {
    constructor(
        private readonly stockService: StockService
    ){}
    @ApiResponse({ status: 201 })
    @Post("outlet")
    updateOutletStock(@Body() stock: tbOutletStock) {
        return this.stockService.outletStockUpdate(stock)
    }

    @ApiResponse({ status: 201 })
    @Post("warehouse")
    updateWarehouseStock(@Body() stock: tbWarehouseStock) {
        return this.stockService.warehouseStockUpdate(stock)
    }

    @ApiResponse({ status: 200 })
    @Get("outlet/:outletId")
    getOutletStock(@Param("outletId") outletId: number) {
        return this.stockService.getOutletStock(outletId)
    }

    @ApiResponse({ status: 200 })
    @Get("warehouse/:warehouseId")
    getWarehouseStock(@Param("warehouseId") warehouseId: number) {
        return this.stockService.getWarehouseStock(warehouseId)
    }

}
