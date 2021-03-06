import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult, MoreThan, Like } from 'typeorm';
import { Observable, from } from 'rxjs';
import { tbItemCategory } from '../models/entity/itemCategory.entity';
import { IItemCategory } from '../models/dto/itemCategory.dto';
import { tbUom } from '../models/entity/uom.enitity';
import { IUom } from '../models/dto/uom.dto';
@Injectable()
export class UomService { 
    constructor(
        @InjectRepository(tbUom)
        private readonly uomRepository: Repository<tbUom>
    ) { }
    // read all
    getAllUom(after: number, take: number): Observable<any> {
        return from(this.uomRepository.find({  where: {id: MoreThan(after)}, take: take}))
    }
    //read user...
    getSingleUom(id: number): Observable<any> {
        return from(this.uomRepository.findOne({ where: { id: id } }));
    }
    //create brand
    createUom(uom: tbUom): Observable<tbUom>{
        return from(this.uomRepository.save(uom));
    }
    async findUom(uom: string) {
        return await this.uomRepository.find({
            where: {
                name: Like(`%${uom.toLowerCase()}%`)
            }
        })
    }
    
    async allocate(uom: number, restaurantId: number) {
        try {
            await this.uomRepository
                .createQueryBuilder()
                .relation(tbUom, "restaurants")
                .of(uom)
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
    async updateUom(uom: IUom, id: number): Promise<UpdateResult | null> {
        return await this.uomRepository.update(id, { ...uom });
      }
      //delete
    async deleteUom(id: number): Promise<DeleteResult> {
        return await this.uomRepository.delete(id)
    }
}
