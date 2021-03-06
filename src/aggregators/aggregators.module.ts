import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AggregatorsController } from './controller/aggregators.controller';
import { tbStores } from './models/entity/stores.entity';
import { AggregatorsService } from './service/aggregators.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      tbStores
    ]),
    HttpModule
  ],
  controllers: [AggregatorsController],
  providers: [AggregatorsService]
})
export class AggregatorsModule {}
