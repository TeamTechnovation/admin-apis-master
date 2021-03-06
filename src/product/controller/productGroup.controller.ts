import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { tbProductGroup } from "../models/entity/productGroup.entity";
import { ProductGroupService } from "../service/productGroup.service";
@ApiTags("productGroup")
@Controller("productGroup")
export class ProductGroup {
    constructor(private readonly productGroupService:ProductGroupService) { }
    @ApiResponse({ status: 200 })
    @Get()
    getProductGroup() {
        return this.productGroupService.getAllProductGroup(0, 200)
    }

    @Get("outlet/:outletId")
    getByOutlet(@Param("outletId") outletId: number) {
        return this.productGroupService.getAllProductGroupByOutlet(outletId)
    }

    @Get("restaurant/:restaurantId")
    getByRestaurant(@Param("restaurantId") restaurantId: number){
        return this.productGroupService.getAllProductGroupByRestaurant(restaurantId)
    }

    @ApiResponse({ status: 201 })
    @Post("create")
    createProductGroup(@Body() group: tbProductGroup) {
        return this.productGroupService.createProductGroup(group)
    }

    @Put("allocate/:groupId/:restaurantId")
    allocateGroupToRestaurant(@Param("groupId") groupId: number, @Param("restaurantId") restaurantId){
        return this.productGroupService.allocate(groupId, restaurantId)
    }

    @Get(":value")
    findBrands(@Param("value") value: string) {
        return this.productGroupService.findGroup(value)
    }
   
}