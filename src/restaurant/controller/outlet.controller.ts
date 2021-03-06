import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { tbOrders } from "../models/entity/orders.entity";
import { tbOutlet } from "../models/entity/outlets.entity";
import { OutletService } from "../service/outlets.service";

@Controller("outlet")
export class OutletController {
    constructor(
        private readonly outletService: OutletService,
    ) {}

    @Get("products/:outletId")
    getProductByOutlet(@Param("outletId") outletId: number){
        return this.outletService.getAllProductByOutlet(outletId)
    }

    @Get("productGroup/:outletId")
    getProductGroup(@Param("outletId") outletId: number) {
        return this.outletService.getAllProductGroups(outletId)
    }

    @Post("order")
    createOrder(@Body() order: tbOrders) {
        return this.outletService.order(order)
    }

    @Get("productType/:outletId")
    getProductByOutletId(@Param("outletId") id: number) {
        return this.outletService.getProductType(id)
    }

    @Get("blueprint/:outletId")
    async getBluePrintOfOutlet(@Param("outletId") outletId: number){
        return await this.outletService.getBluePrintOfOutlet(outletId)
    }

    @Post("login/kot")
    loginKot(@Body() body: any){
        return this.outletService.loginKot(body)
    }

    @Put("update/:id")
    update(@Param("id") id: number, @Body() body: tbOutlet) {
        return this.outletService.update(id, body)
    }

    @Delete(":id")
    deleteOutlet(@Param("id") id: number) {
        return this.outletService.deleteOulet(id)
    }
}