import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { tbOutlet } from "../models/entity/outlets.entity";
import { Repository, MoreThan } from "typeorm";
import { OutletDto } from "../models/dto/outlet.dto";
import { tbOrders } from "../models/entity/orders.entity";
import { tbKot } from "../models/entity/kot.entity";

@Injectable()
export class OutletService{
    constructor(
        @InjectRepository(tbOutlet)
        private readonly outletRepository: Repository<tbOutlet>,
        @InjectRepository(tbOrders)
        private readonly orderRepository: Repository<tbOrders>,
        @InjectRepository(tbKot)
        private readonly kotRepo: Repository<tbKot>
    ) {}

    async createOutlets(outlets: OutletDto[]): Promise<any> {
        return await this.outletRepository.save(outlets);
    }

    async getAllOutets(take: number, after: number, resturantId): Promise<tbOutlet[]> {
        return await this.outletRepository.find({take: take, where:{id: MoreThan(after), resturantId: resturantId}})
    }

    async getOutletsOf(restaurantId: number) {
        return await this.outletRepository.find({
            where: {
                restaurant: restaurantId
            }
        })
    }

    async getAllProductByOutlet(outletId: number){
        return await this.outletRepository.findOne({
            relations: ['product','product.productGroup', 'product.productCategory', 'product.productSize'],
            select: ['id'],
            where: {
                id: outletId,
            },
        })
    }

    async getAllProductGroups(outletId: number) {
        return await this.outletRepository.findOne({
            relations: ["productGroups"],
            select: ['id'],
            where: {
                id: outletId,
            },
        })
    }

    async order(order: tbOrders) {
        return await this.orderRepository.save(order)
    }

    async getProductType(id: number) {
        return await this.outletRepository.findOne({
            where: {
                id: id
            },
            select: ["id"],
            relations: ["productType"]
        })
    }

    async getBluePrintOfOutlet(outletId: number) {
        return await this.outletRepository.findOne({
            where: {
                id: outletId
            },
            select: ["id"],
            relations: ["floors", "floors.areas", "floors.areas.sections", "floors.areas.sections.productTypes"]
        })
    }

    async loginKot(body: any) {
        const kot = await this.kotRepo.findOne({
            where: {
                username: body.username,
                // outlet: body.outletId
            },
            relations: ["productGroup", "floors"]
        })
        if(kot && kot.password == body.password){
            delete kot.password
            return {
                message: "User Logged In",
                statusCode: "200",
                data: kot
            }
        } else {
            return {
                message: "Not Found",
                statusCode: "403",
                data: kot
            }
        }
    }

    async update(id: number, body: tbOutlet) {
        return (await this.outletRepository.update(id, body)).affected > 0
    }

    async deleteOulet(id: number) {
        return (await this.outletRepository.delete(id)).affected > 0
    }
}