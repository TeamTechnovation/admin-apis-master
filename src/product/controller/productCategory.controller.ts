import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { tbProductCategory } from "../models/entity/productCategory.entity";
import { ProductCategoryService } from "../service/productCategory.service";
@ApiTags("productCategory")
@Controller("productCategory")
export class ProductCategory {
    constructor(private readonly productCatoService:ProductCategoryService) { }
    @ApiResponse({ status: 200 })
    @Get()
    getAllCategories() {
        return this.productCatoService.getAllProductCategory(0, 200)
    }

    @Get(":value")
    findBrands(@Param("value") value: string) {
        return this.productCatoService.findCategory(value)
    }

    @Put("allocate/:categoryId/:restaurantId")
    allocateCategoryToRestaurant(@Param("categoryId") categoryId: number, @Param("restaurantId") restaurantId){
        return this.productCatoService.allocate(categoryId, restaurantId)
    }

    @ApiResponse({ status: 201 })
    @Post("create")
    createCategory(@Body() category: tbProductCategory) {
        return this.productCatoService.createProductCategory(category)
    }
}