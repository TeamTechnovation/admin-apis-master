import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Put } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { tbVendor } from '../models/entity/vendor.entity';
import { VendorService } from '../service/vendor.service';
@ApiTags("vendor")
@Controller('vendor')
export class VendorController {
    constructor(
        private readonly vendorService: VendorService
    ){}
    @ApiResponse({ status: 200 })
    @Get()
    getAllVendors() {
        return this.vendorService.getAllVendors()
    }

    @Get(":restaurantId")
    getVendorOfRestaurant(@Param("restaurantId") restaurantId: number) {
        return this.vendorService.getVendorOfRestaurant(restaurantId)
    }

    @ApiResponse({ status: 201 })
    @Post("create")
    creatVendor(@Body() vendor: tbVendor){
        return this.vendorService.createVendor(vendor)
    }

    @ApiResponse({ status: 200 })
    @Get("product/:vendorId")
    getProducts(@Param("vendorId") vendorId: string) {
        return this.vendorService.getVendorProducts(vendorId)
    }

    @ApiResponse({ status: 200 })
    @Put(":vendorId")
    updateVendor(@Param("vendorId") vendorId: number, @Body() vendor: tbVendor) {
        return this.vendorService.updateVendor(vendorId, vendor)
    }


    @ApiResponse({ status: 200 })
    @Delete(":vendorId")
    deleteVendor(@Param("vendorId") vendorId: number) {
        return this.vendorService.deleteVendor(vendorId)
    }
}
