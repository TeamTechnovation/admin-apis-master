import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockController } from './controller/stock.controller';
import { tbOutletStock } from './models/entity/outlet.entity';
import { tbWarehouseStock } from './models/entity/warehouse.entity';
import { StockService } from './service/stock.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      tbOutletStock,
      tbWarehouseStock
    ])
  ],
  controllers: [StockController],
  providers: [StockService]
})
export class StockModule {}
