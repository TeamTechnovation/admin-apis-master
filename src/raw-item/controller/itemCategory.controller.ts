import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { tbItemCategory } from "../models/entity/itemCategory.entity";
import { ItemCategoryService } from "../service/itemCategory.service";
@ApiTags("itemCategory")
@Controller("itemCategory")
export class ItemCategoryController {
    constructor(
        private readonly itemCategoryService:ItemCategoryService
    ){}
    @ApiResponse({ status: 200 })
    @Get()
    getAllCategory() {
        return this.itemCategoryService.getAllItemCategory(0, 200)
    }

    @ApiResponse({ status: 201 })
    @Post("create")
    createCategory(@Body() category: tbItemCategory) {
        return this.itemCategoryService.createItemCategory(category)
    }

    @Get(":value")
    findCategory(@Param("value") value: string) {
        return this.itemCategoryService.findCategory(value)
    }

    @Put("allocate/:categoryId/:restaurantId")
    allocateCategoryToRestaurant(@Param("categoryId") categoryId: number, @Param("restaurantId") restaurantId: number){
        return this.itemCategoryService.allocate(categoryId, restaurantId)
    }
}