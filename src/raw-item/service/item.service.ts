import { Injectable } from '@nestjs/common';
import { tbItem } from '../models/entity/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult, MoreThan } from 'typeorm';
import { Observable, from } from 'rxjs';
import { IRawItem } from '../models/dto/item.dto';
@Injectable()
export class RawItemService {
    constructor(
        @InjectRepository(tbItem)
        private readonly rowItemRepository: Repository<tbItem>
    ) { }
    getAllRawItem(restaurantId: number): Observable<any> {
        return from(this.rowItemRepository.find({
            relations: ['group', 'uom', 'brand', 'category'], where: {
                restaurant: restaurantId
            }
        }))
    }

    getSingleRawItem(id: number): Observable<any> {
        return from(this.rowItemRepository.findOne({ where: { id: id } }));
    }

    createRawItem(Iitem: tbItem): Observable<any> {
        return from(this.rowItemRepository.save(Iitem));
    }
    async updateRawItem(item: tbItem): Promise<boolean> {
        return (await this.rowItemRepository.update(item.id, item)).affected > 0
    }

    async deleteRawItem(id: number): Promise<DeleteResult> {
        return await this.rowItemRepository.delete(id);
    }
}
