import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { tbSales } from '../models/entity/sales.entity';
import * as AWS from "aws-sdk";
import { config } from "dotenv";
import * as Razorpay from "razorpay";
import { tbStores } from 'src/aggregators/models/entity/stores.entity';
config()

const spacesEndpoint = new AWS.Endpoint(process.env.DO_SPACE_ENDPOINT);
const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId: process.env.DO_SPACE_KEY,
    secretAccessKey: process.env.DO_SPACE_SECRET
});
const uploadToDo = (file: any, createdUsing: number) => {
    return new Promise(function (accept, reject) {
        s3.putObject({
            Bucket: process.env.DO_SPACE,
            Body: file.buffer,
            Key: `${createdUsing}$$$${file.originalname}`,
            ACL: 'public-read'
        }, function (err, data) {
            if (err) reject(err);
            else accept(data)
        });
    })
};
@Injectable()
export class CommonService {
    constructor(
        @InjectRepository(tbSales)
        private readonly salesRepository: Repository<tbSales>,
        @InjectRepository(tbStores)
        private readonly storesRepo: Repository<tbStores>
    ) { }

    async createSales(sales: tbSales) {
        try {
            return await this.salesRepository.save(sales)
        } catch (error) {
            console.log(error)
        }

    }

    async getAllSales() {
        return await this.salesRepository.find({
            relations: ["subscription", "restaurant", "coupon"]
        })
    }

    async uploadFiles(file: any, createdUsing: number) {
        return await uploadToDo(file, createdUsing)
    }

    async createOrder(body: any) {
        var instance = new Razorpay({
            key_id: 'rzp_test_iiBh8reAB324ox',
            key_secret: '7cI3MQUOnz1eYHDhwWMerO7h'
        })
        var options = {
            amount: body.amount,
            receipt: body.receipt,
            currency: "INR",
            payment_capture: '0'
        }
        const razorpayOrder = await instance.orders.create(options)
        const sales = await this.salesRepository.save({
            billingFrom: new Date(),
            flag: true,
            orderId: razorpayOrder.orderId,
            restaurant: body.restaurant,
            subscription: body.subscription
        })
        return {
            salesId: sales.id,
            ...razorpayOrder
        }
    }

    async payOrder(salesId: string, paymentId: string) {
        return await this.salesRepository.update(salesId, {
            paymentId: paymentId
        })
    }

    async activateStore(referenceId: string) {
        return (await this.storesRepo.update({reference: referenceId}, {status: true})).affected > 0
    }

    async inActiveStore(id: number) {
        return (await this.storesRepo.update(id, {status: false})).affected > 0
    }
}
