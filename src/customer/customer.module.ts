import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from './controller/customer.controller';
import { tbCustomers } from './models/entity/customer.entity';
import { CustomerService } from './service/customer.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      tbCustomers
    ])
  ],
  controllers: [CustomerController],
  providers: [CustomerService]
})
export class CustomerModule {}
