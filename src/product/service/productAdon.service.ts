import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult, MoreThan, In } from 'typeorm';
import { Observable, from } from 'rxjs';
import { tbProductAdon } from '../models/entity/productAdOn.entity';
@Injectable()
export class ProductAdOnService { 
    constructor(
        @InjectRepository(tbProductAdon)
        private readonly productAdOnRepo: Repository<tbProductAdon>
    ) { }
    // read all
    async getProductAdon(object: any): Promise<tbProductAdon[]> {
        return await this.productAdOnRepo.find({
            where: {
                id: In(object.addOnIds) 
            }
        })
    }   
 
    createProductAdon(adon: tbProductAdon): Observable<tbProductAdon>{
        return from(this.productAdOnRepo.save(adon));
    }
    
    // Update
    async updateProductAdon( id: number,adon: tbProductAdon): Promise<UpdateResult | null> {
        return await this.productAdOnRepo.update(id, { ...adon });
    }
      //delete
    async deleteProductAdon(id: number): Promise<DeleteResult> {
        return await this.productAdOnRepo.delete(id)
    }
}
