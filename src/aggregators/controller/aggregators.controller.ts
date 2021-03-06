import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { tbStores } from '../models/entity/stores.entity';
import { AggregatorsService } from '../service/aggregators.service';

@Controller('aggregators')
export class AggregatorsController {
    constructor(
        private readonly aggregatorService: AggregatorsService
    ){}

    @Post("create/:restaurant")
    createStore(@Body() body: tbStores, @Param("restaurant") restaurant: number) {
        return this.aggregatorService.createStore(body, restaurant)
    }

    @Put("update/:id")
    updateStore(@Body() body: tbStores, @Param("id") id: number) {
        return this.aggregatorService.updateStore(body, id)
    }

    @Get(":restaurant")
    getById(@Param("restaurant") restaurant: number) {
        return this.aggregatorService.getByRestaurant(restaurant)
    }

    @Delete(":id")
    deleteStore(@Param("id") id: number) {
        return this.aggregatorService.deleteStore(id)
    }
}
