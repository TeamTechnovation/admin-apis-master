import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { tbItemGroup } from "../models/entity/itemGroup.entity";
import { ItemGroupService } from "../service/itemGroup.service";
@ApiTags("group")
@Controller("group")
export class ItemGroupController {
    constructor(private readonly itemGroupService:ItemGroupService) { }
    @ApiResponse({ status: 200 })
    @Get()
    getAllGroups(){
        return this.itemGroupService.getAllItemGroup(0, 200)
    }
    @ApiResponse({ status: 201 })
    @Post("create")
    createGroups(@Body() group: tbItemGroup){
        return this.itemGroupService.createItemGroup(group)
    }

    @Get(":value")
    findGroup(@Param("value") value: string) {
        return this.itemGroupService.findGroup(value)
    }

    @Put("allocate/:groupId/:restaurantId")
    allocateGroupToRestaurant(@Param("groupId") groupId: number, @Param("restaurantId") restaurantId){
        return this.itemGroupService.allocate(groupId, restaurantId)
    }
}