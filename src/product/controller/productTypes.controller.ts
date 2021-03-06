import { Controller, Get, Param } from "@nestjs/common";
import { ProductTypesService } from "../service/productTypes.service";

@Controller("productTypes")
export class ProductTypesController{
    constructor(
        private readonly productTypeService: ProductTypesService
    ) {}

    @Get("restaurant/:restaurantId")
    getByRestaurant(@Param("restaurantId") restaurantId: number) {
        return this.productTypeService.getByRestaurant(restaurantId)
    }
}