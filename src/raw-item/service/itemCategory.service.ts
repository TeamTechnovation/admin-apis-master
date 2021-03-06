import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult, MoreThan, Like } from 'typeorm';
import { Observable, from } from 'rxjs';
import { tbItemCategory } from '../models/entity/itemCategory.entity';
import { IItemCategory } from '../models/dto/itemCategory.dto';
@Injectable()
export class ItemCategoryService { 
    constructor(
        @InjectRepository(tbItemCategory)
        private readonly itemCategoryRepository: Repository<tbItemCategory>
    ) { }
    // read all
    getAllItemCategory(after: number, take: number): Observable<any> {
        return from(this.itemCategoryRepository.find({  where: {id: MoreThan(after)}, take: take}))
    }
    //read user...
    getSingleItemCategory(id: number): Observable<any> {
        return from(this.itemCategoryRepository.findOne({ where: { id: id } }));
    }
    //create brand
    createItemCategory(ICategory: tbItemCategory): Observable<tbItemCategory>{
        return from(this.itemCategoryRepository.save(ICategory));
    }
    async findCategory(category: string) {
        return await this.itemCategoryRepository.find({
            where: {
                name: Like(`%${category.toLowerCase()}%`)
            }
        })
    }
    async allocate(categoryId: number, restaurantId: number) {
        try {
            await this.itemCategoryRepository
                .createQueryBuilder()
                .relation(tbItemCategory, "restaurants")
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
    // Update
    async updateItemCategory(ICategory: IItemCategory, id: number): Promise<UpdateResult | null> {
        return await this.itemCategoryRepository.update(id, { ...ICategory });
      }
      //delete
    async deleteItemCategory(id: number): Promise<DeleteResult> {
        return await this.itemCategoryRepository.delete(id)
    }
}
