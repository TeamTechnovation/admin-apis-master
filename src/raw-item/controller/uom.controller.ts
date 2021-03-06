import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { tbUom } from "../models/entity/uom.enitity";
import { UomService } from "../service/uom.service";
@ApiTags("uom")
@Controller("uom")
export class UomController {
    constructor(private readonly uomService:UomService) { }
    @ApiResponse({ status: 200 })
    @Get()
    getAllUom(){
        return this.uomService.getAllUom(0, 200)
    }
    @ApiResponse({ status: 201 })
    @Post("create")
    createUom(@Body() uom: tbUom){
        return this.uomService.createUom(uom)
    }

    @Get(":value")
    findBrands(@Param("value") value: string) {
        return this.uomService.findUom(value)
    }
    
    @Put("allocate/:uomId/:restaurantId")
    allocateUomToRestaurant(@Param("uomId") uomId: number, @Param("restaurantId") restaurantId){
        return this.uomService.allocate(uomId, restaurantId)
    }
}