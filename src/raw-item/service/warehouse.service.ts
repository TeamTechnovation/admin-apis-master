import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult, MoreThan } from 'typeorm';
import { Observable, from } from 'rxjs';
import { tbWarehouse } from 'src/raw-item/models/entity/warehouse.entity';
import { IWarehouse } from '../models/dto/warehouse.dto';
@Injectable()
export class WareHouseService {
    constructor(
        @InjectRepository(tbWarehouse)
        private readonly itemCategoryRepository: Repository<tbWarehouse>
    ) { }
    // read all
    getAllWarehouse(after: number, take: number): Observable<any> {
        return from(this.itemCategoryRepository.find({ where: { id: MoreThan(after) }, take: take, relations: ['type'] }))
    }
    getAllWarehouseByRestaurant(restaurant: number): Observable<any> {
        return from(this.itemCategoryRepository.find({
            where: {
                restaurant: restaurant
            },
            relations: ['type']
        }))
    }
    //read user...
    getSingleWarehouse(id: number): Observable<any> {
        return from(this.itemCategoryRepository.findOne({ where: { id: id } }));
    }
    //create brand
    createItemWarehouse(field: tbWarehouse): Observable<any> {
        return from(this.itemCategoryRepository.save(field));
    }

    // Update
    async updateWarehouse(field: tbWarehouse) {
        return await this.itemCategoryRepository.update(field.id, field);
    }
    //delete
    async deleteWareHouse(id: number): Promise<boolean> {
        return (await this.itemCategoryRepository.delete(id)).affected > 0
    }
}
