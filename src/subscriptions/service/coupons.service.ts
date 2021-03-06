import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { tbCoupons } from "../models/entity/coupon.entity";
import { Repository, UpdateResult, DeleteResult, MoreThan } from "typeorm";

import { tbSubscription } from "../models/entity/subscriptions.entity";
import { CouponDto } from "../models/dto/coupon.dto";

@Injectable()
export class CouponsService {
    constructor(
        @InjectRepository(tbCoupons)
        private readonly couponsRepository: Repository<tbCoupons>
    ) {}

    async createCoupon(coupon: tbCoupons): Promise<tbCoupons> {
        coupon.applicableFor = coupon.applicableForIds.map(id => new tbSubscription({id: id}))
        return await this.couponsRepository.save(coupon);
    }

    async updateCoupon(coupon: CouponDto, couponId: number): Promise<UpdateResult> {
        coupon.applicableFor = coupon.applicableForIds.map(id => new tbSubscription({id: id}))
        return await this.couponsRepository.update(couponId, coupon)
    }
 
    async deleteCoupon(couponId: number | [number]): Promise<DeleteResult> {
        return await this.couponsRepository.delete(couponId);
    }

    async getAllCoupons(take: number, after: number): Promise<tbCoupons[]>{
        return await this.couponsRepository.find({
            where: {id: MoreThan(after)}, 
            take: take, 
            relations: ["applicableFor"],
        })
    }

    async validateCoupon(id: number, coupon: string): Promise<Object> {
        var Coupon = await this.couponsRepository.findOne({
            where: {
                code: coupon
            },
            relations: ["applicableFor"],
        })
        if(Coupon){
            if(Coupon.applicableFor[0].id == id || Coupon.isGlobal){
                return {
                    validate: true,
                    id: Coupon.id,
                    amount: Coupon.amount,
                    percent: Coupon.percent
                }
            } else {
                return {
                    validate: false,
                }
            }
        }
        return {
            validate: false,
        }
    }
}