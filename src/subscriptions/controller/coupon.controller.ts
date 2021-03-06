import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { tbCoupons } from "../models/entity/coupon.entity";
import { CouponsService } from "../service/coupons.service";
@ApiTags("coupon")
@Controller("coupon")
export class CouponController {
    constructor(
        private readonly couponService: CouponsService   
    ){}
    @ApiResponse({ status: 200 })
    @Get("validate/:coupon/:id")
    async validate(@Param("coupon") coupon: string, @Param("id") id: number){
        return await this.couponService.validateCoupon(id, coupon)
    }
    @ApiResponse({ status: 200 })
    @Get()
    async getAllCoupons() {
        return await this.couponService.getAllCoupons(100, 0)
    }
    @ApiResponse({ status: 201 })
    @Post("create")
    async createCoupons(@Body() coupon: tbCoupons) {
        return await this.couponService.createCoupon(coupon)
    }
}