import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { tbOutletStock } from 'src/stock/models/entity/outlet.entity';
import { tbWarehouseStock } from 'src/stock/models/entity/warehouse.entity';
import { Repository } from 'typeorm';
import { tbItemsInTransaction } from '../models/entity/itemsInTransaction.entity';
import { tbTransaction } from '../models/entity/transaction.entity';

@Injectable()
export class ItemReceiveDispatchService {
    constructor(
        @InjectRepository(tbTransaction)
        private readonly transactionRepo: Repository<tbTransaction>,
        @InjectRepository(tbOutletStock)
        private readonly outletStockRepo: Repository<tbOutletStock>,
        @InjectRepository(tbWarehouseStock)
        private readonly warehouseStockRepo: Repository<tbWarehouseStock>,
        @InjectRepository(tbItemsInTransaction)
        private readonly itemInTransactionRepo: Repository<tbItemsInTransaction>
    ) { }

    async createTransaction(transaction: tbTransaction) {
        if (transaction.originType == "warehouse" && transaction.destinationType == "warehouse") {
            transaction.items.forEach(item => {
                this.warehouseStockRepo.createQueryBuilder()
                    .update(tbWarehouseStock)
                    .set({ quantity: () => `quantity + ${item.quantity}` })
                    .where({item: item.item, warehouse: transaction.destinationId})
                    .execute()
                    .then(u => {
                        if(u.affected == 0){
                            this.warehouseStockRepo.save({
                                item: item.item,
                                quantity: item.quantity,
                                warehouse: transaction.destinationId
                            })
                        }
                    })
            });
            transaction.items.forEach(item => {
                this.warehouseStockRepo.createQueryBuilder()
                    .update(tbWarehouseStock)
                    .set({ quantity: () => `quantity - ${item.quantity}` })
                    .where({item: item.item, warehouse: transaction.originId})
                    .execute()
                    .then(u => {
                        if(u.affected == 0){
                            this.warehouseStockRepo.save({
                                item: item.item,
                                quantity: item.quantity,
                                warehouse: transaction.destinationId
                            })
                        }
                    })
            });
        }else if(transaction.originType == "warehouse" && transaction.destinationType == "outlet") {
            transaction.items.forEach(item => {
                this.outletStockRepo.createQueryBuilder()
                    .update(tbOutletStock)
                    .set({ quantity: () => `quantity + ${item.quantity}` })
                    .where({item: item.item, outlet: transaction.destinationId})
                    .execute()
                    .then(u =>{
                        if(u.affected == 0){
                            this.outletStockRepo.save({
                                item: item.item,
                                quantity: item.quantity,
                                outlet: transaction.destinationId
                            })
                        }
                    })
            });
            transaction.items.forEach(item => {
                this.warehouseStockRepo.createQueryBuilder()
                    .update(tbWarehouseStock)
                    .set({ quantity: () => `quantity - ${item.quantity}` })
                    .where({item: item.item, warehouse: transaction.originId})
                    .execute()
                    .then(u =>{
                        if(u.affected == 0){
                            this.warehouseStockRepo.save({
                                item: item.item,
                                quantity: item.quantity,
                                warehouse: transaction.destinationId
                            })
                        }
                    })
            });
        }else if(transaction.originType == "outlet" && transaction.destinationType == "outlet") {
            transaction.items.forEach(item => {
                this.outletStockRepo.createQueryBuilder()
                    .update(tbOutletStock)
                    .set({ quantity: () => `quantity + ${item.quantity}` })
                    .where({item: item.id, outlet: transaction.destinationId})
                    .execute()
                    .then(u => {
                        if(u.affected == 0){
                            this.outletStockRepo.save({
                                item: item.item,
                                quantity: item.quantity,
                                outlet: transaction.destinationId
                            })
                        }
                    })
            });
            transaction.items.forEach(item => {
                this.outletStockRepo.createQueryBuilder()
                    .update(tbOutletStock)
                    .set({ quantity: () => `quantity - ${item.quantity}` })
                    .where({item: item.id, outlet: transaction.destinationId})
                    .execute()
                    .then(u => {
                        if(u.affected == 0){
                            this.outletStockRepo.save({
                                item: item.item,
                                quantity: item.quantity,
                                outlet: transaction.destinationId
                            })
                        }
                    })
            });
        } else {
            //condition for receiving from vendor...
            transaction.items.forEach(element => {
                this.warehouseStockRepo.createQueryBuilder()
                    .update(tbWarehouseStock)
                    .set({ quantity: () => `quantity + ${element.quantity}` })
                    .where({item: element.item, warehouse: transaction.destinationId})
                    .execute()
                    .then(u => {
                        if(u.affected == 0){
                            this.warehouseStockRepo.save({
                                item: element.item,
                                quantity: element.quantity,
                                warehouse: transaction.destinationId
                            })
                        }
                    })
                    .catch(e => console.log(e))
            });
        }
        return await this.transactionRepo.save(transaction)
    }

    async getRecievedItemFromVendor(restaurantId: number) {
        var result = await this.transactionRepo.query(`select * from GetReceived(${restaurantId})`)
        return result
    }

    async deleteTransaction(transactionId: number) {
        return (await this.transactionRepo.delete(transactionId)).affected > 0
    }

    async getItemsInTransaction(id: number) {
        return await this.itemInTransactionRepo.find({
            where: {
                transaction: id
            },
            relations: ["item"]
        })
    }

    async updateTransaction(transaction: any) {
        if(false){
            
        } else {
             //condition for receiving from vendor...
             transaction.items.forEach(element => {
                this.warehouseStockRepo.createQueryBuilder()
                    .update(tbWarehouseStock)
                    .set({ quantity: () => `quantity - ${element.quantity}` })
                    .where({item: element.item, warehouse: transaction.destinationId})
                    .execute()
                    .then(u => {
                        if(u.affected == 0){
                            this.warehouseStockRepo.save({
                                item: element.item,
                                quantity: element.quantity,
                                warehouse: transaction.destinationId
                            })
                        }
                    })
                    .catch(e => console.log(e))
            });
        }
    }
}
