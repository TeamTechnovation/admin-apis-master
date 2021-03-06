import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { tbVendor } from '../models/entity/vendor.entity';

@Injectable()
export class VendorService {
    constructor(
        @InjectRepository(tbVendor)
        private readonly vendorRepository: Repository<tbVendor>
    ){}

    async createVendor(vendor: tbVendor) {
        return this.vendorRepository.save(vendor)
    }

    async getAllVendors() {
        return this.vendorRepository.find({
            relations: ["item", "item.item"]
        })
    }

    async getVendorProducts(vendorId: string) {
        return this.vendorRepository.findOne({
            relations: ["item", "item.item", "item.item.uom"],
            where: {
                id: parseInt(vendorId)
            }
        })
    }

    async getVendorOfRestaurant(restaurantId: number) {
        return await this.vendorRepository.find({
            where: {
                restaurant: restaurantId
            },
        })
    }

    async deleteVendor(id: number): Promise<any> {
        //diff approach...
        this.vendorRepository.createQueryBuilder()
        .update(tbVendor)
        .set({flag: false})
        .execute()
        .then(u => {
            if(u.affected > 0){
                return {status : false, msg : "Already Vendor deleted"}
            }else {
                return {status : true, msg : "Vendor deleted"}
            }
        })  
        
        const VendorId = await this.vendorRepository.findOne({ where :{ id : id }})
        if (VendorId.flag === true){
          return await this.vendorRepository.update(id,{ flag :false}).then(() =>{ return {status : false, msg : "Vendor deleted"} })
        }else{
          return {status : false, msg : "Already Vendor deleted"}
        }
      }
    async updateVendor(id: number,vendor: tbVendor): Promise<UpdateResult | null> {
        return await this.vendorRepository.update(id, { ...vendor });
    }
}
