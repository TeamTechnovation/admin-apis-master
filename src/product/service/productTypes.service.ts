import { Controller } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { tbProductType } from "../models/entity/productType.entity";

@Controller("productTypes")
export class ProductTypesService{
    constructor(
        @InjectRepository(tbProductType)
        private readonly productTypeRepo: Repository<tbProductType>
    ) {}

    async getByRestaurant(id: number) {
        return await this.productTypeRepo.find({
            where: {
                restaurant: id
            },
            relations: ["restaurant"]
        })
    }
}