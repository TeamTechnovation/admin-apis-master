import { Body, Controller, Get, Param, Post, Delete, Put } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { tbItem } from "../models/entity/item.entity";
import { RawItemService } from "../service/item.service";
@ApiTags("rawItem")
@Controller("rawItem")
export class RawItemController {
    constructor(
        private readonly rawItemService: RawItemService,
    ){}
    @ApiResponse({ status: 200 })
    @Get(":restaurantId")
    getAllRawItems(@Param("restaurantId") restaurantId: number){
        return this.rawItemService.getAllRawItem(restaurantId);
    }
    @ApiResponse({ status: 201 })
    @Post("create")
    createRawItem(@Body() rawItem: tbItem){
        return this.rawItemService.createRawItem(rawItem)
    }

    @Delete(":id")
    deleteItem(@Param("id") id: number) {
        return this.rawItemService.deleteRawItem(id)
    }

    @Put()
    updateItem(@Body() body: tbItem) {
        return this.rawItemService.updateRawItem(body)
    }
}