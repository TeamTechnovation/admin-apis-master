import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult, MoreThan, Like } from 'typeorm';
import { Observable, from } from 'rxjs';
import { tbProductCategory } from '../models/entity/productCategory.entity';
import { IProductCategory } from '../models/dto/productCategory.dto';
import { tbProductGroup } from '../models/entity/productGroup.entity';
import { IProductGroup } from '../models/dto/productGroup.dto';
import { tbProductSize } from '../models/entity/productSize.entity';
import { IProductSize } from '../models/dto/productSize.dto';
@Injectable()
export class ProductSizeService { 
    constructor(
        @InjectRepository(tbProductSize)
        private readonly productSizeRepo: Repository<tbProductSize>
    ) { }
    // read all
    getAllProductSize(after: number, take: number): Observable<any> {
        return from(this.productSizeRepo.find({  where: {id: MoreThan(after)}, take: take}))
    }
    //read user...
    getSingleProductSize(id: number): Observable<any> {
        return from(this.productSizeRepo.findOne({ where: { id: id } }));
    }
    //create brand
    createProductSize(product: tbProductSize): Observable<tbProductSize>{
        return from(this.productSizeRepo.save(product));
    }
    
    // Update
    async updateProductSize(product: IProductSize, id: number): Promise<UpdateResult | null> {
        return await this.productSizeRepo.update(id, { ...product });
    }
      //delete
    async deleteProductSize(id: number): Promise<DeleteResult> {
        return await this.productSizeRepo.delete(id)
    }
    
    async findSize(brand: string) {
        return await this.productSizeRepo.find({
            where: {
                name: Like(`%${brand.toLowerCase()}%`)
            }
        })
    }

    async allocate(sizeId: number, restaurantId: number) {
        try {
            await this.productSizeRepo
                .createQueryBuilder()
                .relation(tbProductCategory, "restaurants")
                .of(sizeId)
                .add(restaurantId)
            return {
                message: "success",
                statusCode: 201
            }
        } catch (error) {
            throw new HttpException('Error', HttpStatus.NOT_IMPLEMENTED);
        }
    }
}
