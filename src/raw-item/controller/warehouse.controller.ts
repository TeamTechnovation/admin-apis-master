import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { tbWarehouse } from "../models/entity/warehouse.entity";
import { WareHouseService } from "../service/warehouse.service";
import { WareHouseTypeService } from "../service/warehouseType.service";
@ApiTags("warehouse")
@Controller("warehouse")
export class WarehouseController {
    constructor(
        private readonly warehouseService: WareHouseService,
        private readonly warehouseTypeService: WareHouseTypeService
    ){}
    @ApiResponse({ status: 200 })
    @Get()
    getAllWarehouse() {
        return this.warehouseService.getAllWarehouse(0, 200)
    }
    @ApiResponse({ status: 200 })
    @Get("type")
    getWarehouseTypes() {
        return this.warehouseTypeService.getAllWarehouseType()
    }
    @Get(":restaurantId")
    getAllWarehouseByRestaurant(@Param("restaurantId") restaurantId: number) {
        return this.warehouseService.getAllWarehouseByRestaurant(restaurantId)
    }
    
    @ApiResponse({ status: 201 })
    @Post("create")
    createType(@Body() warehouse: tbWarehouse){
        return this.warehouseService.createItemWarehouse(warehouse)
    }

    @Delete(":id")
    deleteWarehouse(@Param() id: number) {
        return this.warehouseService.deleteWareHouse(id)
    }

    @Put()
    updateWarehouse(@Body() body: any) {
        return this.warehouseService.updateWarehouse(body)
    }
}