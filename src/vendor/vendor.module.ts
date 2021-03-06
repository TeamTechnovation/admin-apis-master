import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendorController } from './controller/vendor.controller';
import { tbItemFromVendor } from './models/entity/itemFromVendor.entity';
import { tbVendor } from './models/entity/vendor.entity';
import { VendorService } from './service/vendor.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      tbItemFromVendor,
      tbVendor
    ])
  ],
  controllers: [VendorController],
  providers: [VendorService]
})
export class VendorModule {}
