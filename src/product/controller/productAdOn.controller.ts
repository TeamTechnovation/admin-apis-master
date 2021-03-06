import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { tbProductAdon } from "../models/entity/productAdOn.entity";
import { ProductAdOnService } from "../service/productAdon.service";

@Controller("productAdOn")
export class ProductAdOnController{
    constructor(private readonly productAdon:ProductAdOnService) {}

    @Post()
    getProductAddOn(@Body() object: any) {
        return this.productAdon.getProductAdon(object);
    }
    
    @Post("create")
    createProductAdon(@Body() product: tbProductAdon) {
        return this.productAdon.createProductAdon(product)
    }

    @Put(":adOnId")
    async updateProductAdon(@Param("adOnId") adOnId: number,@Body() product: tbProductAdon): Promise<Boolean> {
        return (await this.productAdon.updateProductAdon(adOnId,product)).affected > 0
    }

    @Delete(":adOnId")
    async deleteAdOnProduct(@Param("adOnId") adOnId): Promise<Boolean> {
        return (await this.productAdon.deleteProductAdon(adOnId)).affected > 0
    }
}