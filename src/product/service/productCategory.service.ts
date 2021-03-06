import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult, MoreThan, Like } from 'typeorm';
import { Observable, from } from 'rxjs';
import { tbProductCategory } from '../models/entity/productCategory.entity';
import { IProductCategory } from '../models/dto/productCategory.dto';
@Injectable()
export class ProductCategoryService {
    constructor(
        @InjectRepository(tbProductCategory)
        private readonly productCategoryRepo: Repository<tbProductCategory>
    ) { }
    // read all
    getAllProductCategory(after: number, take: number): Observable<any> {
        return from(this.productCategoryRepo.find({ where: { id: MoreThan(after) }, take: take }))
    }
    //read user...
    getSingleProductCategory(id: number): Observable<any> {
        return from(this.productCategoryRepo.findOne({ where: { id: id } }));
    }
    //create brand
    createProductCategory(product: tbProductCategory): Observable<tbProductCategory> {
        return from(this.productCategoryRepo.save(product));
    }

    // Update
    async updateProductCategory(product: IProductCategory, id: number): Promise<UpdateResult | null> {
        return await this.productCategoryRepo.update(id, { ...product });
    }
    //delete
    async deleteProductCategory(id: number): Promise<DeleteResult> {
        return await this.productCategoryRepo.delete(id)
    }

    async allocate(categoryId: number, restaurantId: number) {
        try {
            await this.productCategoryRepo
                .createQueryBuilder()
                .relation(tbProductCategory, "restaurants")
                .of(categoryId)
                .add(restaurantId)
            return {
                message: "success",
                statusCode: 201
            }
        } catch (error) {
            throw new HttpException('Error', HttpStatus.NOT_IMPLEMENTED);
        }
    }

    async findCategory(brand: string) {
        return await this.productCategoryRepo.find({
            where: {
                name: Like(`%${brand.toLowerCase()}%`)
            }
        })
    }
}
