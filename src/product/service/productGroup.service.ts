import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult, MoreThan, Like } from 'typeorm';
import { Observable, from } from 'rxjs';
import { tbProductCategory } from '../models/entity/productCategory.entity';
import { tbProductGroup } from '../models/entity/productGroup.entity';
import { IProductGroup } from '../models/dto/productGroup.dto';
@Injectable()
export class ProductGroupService {
    constructor(
        @InjectRepository(tbProductGroup)
        private readonly productProductRepo: Repository<tbProductGroup>
    ) { }
    // read all
    getAllProductGroup(after: number, take: number): Observable<any> {
        return from(this.productProductRepo.find({  where: {id: MoreThan(after)}, take: take}))
    }

    getAllProductGroupByRestaurant(restaurant: number): Observable<any> {
        return from(this.productProductRepo.find({
            where: {
                restaurants: restaurant
            }
        }))
    }

    getAllProductGroupByOutlet(outlet: number): Observable<any> {
        return from(this.productProductRepo.find({
            where: {
                outlet: outlet
            }
        }))
    }
    //read user...
    getSingleProductGroup(id: number): Observable<any> {
        return from(this.productProductRepo.findOne({ where: { id: id } }));
    }
    //create brand
    createProductGroup(product: tbProductGroup): Observable<tbProductGroup>{
        return from(this.productProductRepo.save(product));
    }
    
    // Update
    async updateProductGroup(product: IProductGroup, id: number): Promise<UpdateResult | null> {
        return await this.productProductRepo.update(id, { ...product });
    }
      //delete
    async deleteProductGroup(id: number): Promise<DeleteResult> {
        return await this.productProductRepo.delete(id)
    }

    async findGroup(brand: string) {
        return await this.productProductRepo.find({
            where: {
                name: Like(`%${brand.toLowerCase()}%`)
            }
        })
    }

    async allocate(groupId: number, restaurantId: number) {
        try {
            await this.productProductRepo
                .createQueryBuilder()
                .relation(tbProductCategory, "restaurants")
                .of(groupId)
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
