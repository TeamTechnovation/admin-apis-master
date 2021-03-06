import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { tbItem } from './models/entity/item.entity';
import { RawItemService } from './service/item.service';
import { tbItemCategory } from './models/entity/itemCategory.entity';
import { tbItemGroup } from './models/entity/itemGroup.entity';
import { tbWarehouseType } from './models/entity/warehouseType.entity';
import { tbWarehouse } from 'src/raw-item/models/entity/warehouse.entity';
import { tbUom } from './models/entity/uom.enitity';
import { tbItemBrand } from './models/entity/brand.entity';
import { BrandService } from './service/brand.service';
import { ItemCategoryService } from './service/itemCategory.service';
import { ItemGroupService } from './service/itemGroup.service';
import { WareHouseTypeService } from './service/warehouseType.service';
import { UomService } from './service/uom.service';
import { WareHouseService } from './service/warehouse.service';
import { tbOutlet } from 'src/restaurant/models/entity/outlets.entity';
import { RawItemController } from './controller/rawItem.controller';
import { ItemCategoryController } from './controller/itemCategory.controller';
import { ItemGroupController } from './controller/itemGroup.controller';
import { UomController } from './controller/uom.controller';
import { BrandController } from './controller/itemBrand.controller';
import { WarehouseController } from './controller/warehouse.controller';
@Module({
  imports: [
    TypeOrmModule.forFeature([tbItem, tbItemCategory, tbItemGroup, tbWarehouse, tbUom, tbItemBrand, tbOutlet, tbWarehouseType])
  ],
  providers: [RawItemService,
    BrandService,
    ItemCategoryService, 
    ItemGroupService,
    UomService,
    WareHouseService, 
    WareHouseTypeService
  ],
  controllers: [RawItemController, ItemCategoryController, ItemGroupController, UomController, BrandController, WarehouseController]
})
export class RawItemModule { }
