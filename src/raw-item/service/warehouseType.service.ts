import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Observable, from } from 'rxjs';
import { tbWarehouseType } from '../models/entity/warehouseType.entity';
import { IType } from '../models/dto/type.dto';
@Injectable()
export class WareHouseTypeService { 
    constructor(
        @InjectRepository(tbWarehouseType)
        private readonly warehousetypeRepository: Repository<tbWarehouseType>
    ) { }
    // read all
    async getAllWarehouseType(){
        return await this.warehousetypeRepository.find()
    }
    //read user...
    getSingleWarehouseType(id: number): Observable<any> {
        return from(this.warehousetypeRepository.findOne({ where: { id: id } }));
    }
    //create brand
    createWarehouseType(type: tbWarehouseType): Observable<tbWarehouseType>{
        return from(this.warehousetypeRepository.save(type));
    }
    
    // Update
    async updateWarehouseType(type: IType, id: number): Promise<UpdateResult | null> {
        return await this.warehousetypeRepository.update(id, { ...type });
      }
      //delete
    async deleteWarehouseType(id: number): Promise<DeleteResult> {
        return await this.warehousetypeRepository.delete(id)
    }
}
