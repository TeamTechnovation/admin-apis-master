import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { tbItemBrand } from "../models/entity/brand.entity";
import { BrandService } from "../service/brand.service";
@ApiTags("brand")
@Controller("brand")
export class BrandController {
    constructor(private readonly brandService:BrandService) { }
    @ApiResponse({ status: 200 })
    @Get()
    getAllBrands() {
        return this.brandService.getAllBrand(0, 200)
    }
    @ApiResponse({ status: 201 })
    @Post("create")
    createBrand(@Body() brand: tbItemBrand){
        return this.brandService.createBrand(brand)
    }

    @Get(":value")
    findBrands(@Param("value") value: string) {
        return this.brandService.findBrand(value)
    }

    @Put("allocate/:brandId/:restaurantId")
    allocateBrandToRestaurant(@Param("brandId") brandId: number, @Param("restaurantId") restaurantId){
        return this.brandService.allocate(brandId, restaurantId)
    }
}