import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { tbProductSize } from "../models/entity/productSize.entity";
import { ProductSizeService } from "../service/productSize.service";
@ApiTags("productSize")
@Controller("productSize")
export class ProductSizeController {
    constructor(private readonly productSizeService:ProductSizeService) { }
    @ApiResponse({ status: 200 })
    @Get()
    getAllSizes() {
        return this.productSizeService.getAllProductSize(0, 200)
    }
    @ApiResponse({ status: 201 })
    @Post("create")
    createSize(@Body() size: tbProductSize) {
        return this.productSizeService.createProductSize(size)
    }

    @Put("allocate/:sizeId/:restaurantId")
    allocateSizeToRestaurant(@Param("sizeId") sizeId: number, @Param("restaurantId") restaurantId){
        return this.productSizeService.allocate(sizeId, restaurantId)
    }

    @Get(":value")
    findBrands(@Param("value") value: string) {
        return this.productSizeService.findSize(value)
    }
}