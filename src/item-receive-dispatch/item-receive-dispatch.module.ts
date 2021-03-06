import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { tbOutletStock } from 'src/stock/models/entity/outlet.entity';
import { tbWarehouseStock } from 'src/stock/models/entity/warehouse.entity';
import { StockModule } from 'src/stock/stock.module';
import { ItemReceiveDispatchController } from './controller/item-receive-dispatch.controller';
import { tbItemsInTransaction } from './models/entity/itemsInTransaction.entity';
import { tbTransaction } from './models/entity/transaction.entity';
import { ItemReceiveDispatchService } from './service/item-receive-dispatch.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      tbTransaction,
      tbItemsInTransaction,
      tbWarehouseStock,
      tbOutletStock
    ]),
    StockModule
  ],
  controllers: [ItemReceiveDispatchController],
  providers: [ItemReceiveDispatchService]
})
export class ItemReceiveDispatchModule {}
