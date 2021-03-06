import { HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from } from 'rxjs';
import { Repository } from 'typeorm';
import { tbStores } from '../models/entity/stores.entity';
import { config } from "dotenv";
config()

@Injectable()
export class AggregatorsService {
    constructor(
        @InjectRepository(tbStores)
        private readonly storeRepo: Repository<tbStores>,
        private httpService: HttpService
    ){}

    async createStore(body: tbStores, restaurant: number) {
        const savedStore = await this.storeRepo.save({
            ...body,
            restaurant: restaurant
        })
        const modifiedBody = {
            ...body,
            ref_id: savedStore.id
        }
        modifiedBody.platform_data = JSON.parse(modifiedBody.platform_data)
        const res = await from(this.httpService.post("https://pos-int.urbanpiper.com/external/api/v1/stores/", {
            stores: [modifiedBody]
        }, {
            headers: {
                Authorization: `apikey ${process.env.URBAN_PIPER_USER}:${process.env.URBAN_PIPER_KEY}`,
                "Content-Type": "application/json"
            }
        })).toPromise()
        await this.storeRepo.update(savedStore.id, {
            reference: res.data.reference
        })
        if(res.data.status) {
            return {
                reference: res.data.reference,
                data: modifiedBody
            }
        }
    }

    async updateStore(body: tbStores, id: number) {
        const modifiedBody = {
            ...body,
            ref_id: id
        }
        modifiedBody.platform_data = JSON.parse(modifiedBody.platform_data)
        const res = await from(this.httpService.post("https://pos-int.urbanpiper.com/external/api/v1/stores/", {
            stores: [modifiedBody]
        }, {
            headers: {
                Authorization: `apikey ${process.env.URBAN_PIPER_USER}:${process.env.URBAN_PIPER_KEY}`,
                "Content-Type": "application/json"
            }
        })).toPromise()
        if(res.data.status === 'success') {
            await this.storeRepo.update(id, body)
            return true
        }
        return false
    }

    async deleteStore(id: number) {
        const res = await from(this.httpService.post("https://pos-int.urbanpiper.com/external/api/v1/stores/", {
            stores: [{
                ref_id: id,
                active: false,
            }]
        }, {
            headers: {
                Authorization: `apikey ${process.env.URBAN_PIPER_USER}:${process.env.URBAN_PIPER_KEY}`,
                "Content-Type": "application/json"
            }
        })).toPromise()
        if(res.data.status === 'success') return true
        return false
    }

    async getByRestaurant(restaurant: number) {
        return await this.storeRepo.find({
            where: {
                restaurant: restaurant,
                status: true
            }
        })
    }
}
