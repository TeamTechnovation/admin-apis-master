import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult, MoreThan, Like } from 'typeorm';
import { Observable, from } from 'rxjs';
import { tbItemCategory } from '../models/entity/itemCategory.entity';
import { IItemCategory } from '../models/dto/itemCategory.dto';
import { tbItemGroup } from '../models/entity/itemGroup.entity';
import { IItemGroup } from '../models/dto/itemGroup.dto';
@Injectable()
export class ItemGroupService { 
    constructor(
        @InjectRepository(tbItemGroup)
        private readonly itemGroupRepository: Repository<tbItemGroup>
    ) { }
    // read all
    getAllItemGroup(after: number, take: number): Observable<any> {
        return from(this.itemGroupRepository.find({  where: {id: MoreThan(after)}, take: take}))
    }
    //read user...
    getSingleItemGroup(id: number): Observable<any> {
        return from(this.itemGroupRepository.findOne({ where: { id: id } }));
    }
    //create brand
    createItemGroup(item: tbItemGroup): Observable<tbItemGroup>{
        return from(this.itemGroupRepository.save(item));
    }
    async findGroup(group: string) {
        return await this.itemGroupRepository.find({
            where: {
                name: Like(`%${group.toLowerCase()}%`)
            }
        })
    }
    async allocate(groupId: number, restaurantId: number) {
        try {
            await this.itemGroupRepository
                .createQueryBuilder()
                .relation(tbItemGroup, "restaurants")
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

    // Update
    async updateItemGroup(item: IItemGroup, id: number): Promise<UpdateResult | null> {
        return await this.itemGroupRepository.update(id, { ...item });
      }
      //delete
    async deleteItemGroup(id: number): Promise<DeleteResult> {
        return await this.itemGroupRepository.delete(id)
    }
}
