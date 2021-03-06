import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { Put } from "@nestjs/common/decorators/http/request-mapping.decorator";
import { Delete } from "@nestjs/common/decorators/http/request-mapping.decorator";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import GetProductsDto from "../models/dto/getProduct.dto";
import { tbProduct } from "../models/entity/product.entity";
import { ProductService } from "../service/product.service";
@ApiTags("product")
@Controller("product")
export class ProductController{
    constructor(private readonly productService:ProductService) {}

    @Get()
    getAllProducts() {
        return this.productService.getAllProduct()
    }

    @Get("restaurant/:restaurantId")
    getAllProductsByRestaurant(@Param("restaurantId") restaurantId: number) {
        return this.productService.getAllByRestaurant(restaurantId)
    }

    @Get("items/:product")
    getAllItemOfProduct(@Param("product") product: number) {
        return this.productService.getProductItemWithQuantity(product)
    }

    @Post("create")
    createProduct(@Body() product: tbProduct) {
        return this.productService.createProduct(product)
    }

    @Put()
    updateProduct(@Body() product: tbProduct) {
        return this.productService.updateProduct(product)
    }

    @Delete(":id")
    deleteAdOnProduct(@Param("id") id: number): Promise<Boolean> {
        return this.productService.deleteProduct(id)
    }

    @Get("group/:groupId")
    getProductByGroupId(@Param("groupId") groupdId: number) {
        return this.productService.getProductByGroup(groupdId)
    }

    @Post("outlet")
    getByTypeAndOutlet(@Body() getProduct: GetProductsDto) {
        return this.productService.getByTypeAndOutlet(getProduct)
    }

    @Post("restaurant")
    getByTypeAndRestaurant(@Body() getProduct: GetProductsDto) {
        return this.productService.getByTypeAndRestaurant(getProduct)
    }

    @Get("dayTime/restaurant/:restaurantId")
    getDayTimeByRestaurant(@Param("restaurantId") restaurantId: number) {
        return this.productService.getDayTimeCategoryByRestaurant(restaurantId)
    }

    @Get("dayTime/outlet/:outletId")
    getDayTimeByOutlet(@Param("outletId") outletId: number) {
        return this.productService.getDayTimeCategoryByOutlet(outletId)
    }
}