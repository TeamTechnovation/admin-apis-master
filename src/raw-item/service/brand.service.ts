import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { tbItem } from '../models/entity/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult, MoreThan, Like, getConnection } from 'typeorm';
import { Observable, from, of } from 'rxjs';
import { tbItemBrand } from '../models/entity/brand.entity';
import { IItemBrand } from '../models/dto/brand.dto';
@Injectable()
export class BrandService {
    constructor(
        @InjectRepository(tbItemBrand)
        private readonly itemBrandRepository: Repository<tbItemBrand>
    ) { }
    // read all
    getAllBrand(after: number, take: number): Observable<any> {
        return from(this.itemBrandRepository.find({ where: { id: MoreThan(after) }, take: take }))
    }
    //read user...
    getSingleBrand(id: number): Observable<any> {
        return from(this.itemBrandRepository.findOne({ where: { id: id } }));
    }
    //create brand
    createBrand(IBrand: tbItemBrand): Observable<tbItemBrand> {
        return from(this.itemBrandRepository.save(IBrand));
    }

    async findBrand(brand: string) {
        return await this.itemBrandRepository.find({
            where: {
                name: Like(`%${brand.toLowerCase()}%`)
            }
        })
    }

    async allocate(brandId: number, restaurantId: number) {
        try {
            await this.itemBrandRepository
                .createQueryBuilder()
                .relation(tbItemBrand, "restaurants")
                .of(brandId)
                .add(restaurantId)
            return {
                message: "success",
                statusCode: 201
            }
        } catch (error) {
            throw new HttpException('Error', HttpStatus.NOT_IMPLEMENTED);
        }
    }

    // Update
    async updateBrand(IBrand: IItemBrand, id: number): Promise<UpdateResult | null> {
        return await this.itemBrandRepository.update(id, { ...IBrand });
    }
    //delete
    async deleteBrand(id: number): Promise<DeleteResult> {
        return await this.itemBrandRepository.delete(id)
    }
}
