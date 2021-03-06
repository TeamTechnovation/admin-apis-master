import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { tbTransaction } from '../models/entity/transaction.entity';
import { ItemReceiveDispatchService } from '../service/item-receive-dispatch.service';
@ApiTags("item-receive-dispatch")
@Controller('item-receive-dispatch')
export class ItemReceiveDispatchController {
    constructor(
        private readonly receiveDispatchService: ItemReceiveDispatchService
    ){}

    @ApiResponse({ status: 201 })
    @Post()
    recieveItemFromVendor(@Body() transaction: tbTransaction){
        return this.receiveDispatchService.createTransaction(transaction)
    }
    @ApiResponse({ status: 200 })
    @Get(":restaurantId")
    getRecievedItemFromVendor(@Param("restaurantId") restaurantId: number){
        return this.receiveDispatchService.getRecievedItemFromVendor(restaurantId)
    }

    @Delete(":id")
    deleteTransaction(@Param("id") id: number) {
        return this.receiveDispatchService.deleteTransaction(id)
    }

    @Get("items/:id")
    getItemsInTransaction(@Param("id") id: number) {
        return this.receiveDispatchService.getItemsInTransaction(id)
    }

    // @Put()
    // updateTransaction(@Body() body: any) {
    //     return this.
    // }
}
