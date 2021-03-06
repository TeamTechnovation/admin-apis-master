import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { tbOutletStock } from '../models/entity/outlet.entity';
import { tbWarehouseStock } from '../models/entity/warehouse.entity';

@Injectable()
export class StockService {
    constructor(
        @InjectRepository(tbOutletStock)
        private readonly outletRepository: Repository<tbOutletStock>,
        @InjectRepository(tbWarehouseStock)
        private readonly warehouseRepository: Repository<tbWarehouseStock>
    ){}
    async outletStockUpdate(stock: tbOutletStock) {
        return this.outletRepository.update({id: stock.id}, stock)
    }
    async warehouseStockUpdate(stock: tbWarehouseStock) {
        return this.warehouseRepository.update({id: stock.id}, stock)
    }
    async getOutletStock(outletId: number) {
        return this.outletRepository.find({
            where: {
                outlet: outletId
            },
            relations: ["item", "item.brand", "item.category", "item.group", "item.uom"]
        })
    }
    async getWarehouseStock(warehouseId: number) {
        return this.warehouseRepository.find({
            where: {
                warehouse: warehouseId
            },
            relations: ["item", "item.brand", "item.category", "item.group", "item.uom"]
        })
    }
}
