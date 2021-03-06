import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { tbProduct } from './models/entity/product.entity';
import { tbProductCategory } from './models/entity/productCategory.entity';
import { ProductService } from './service/product.service';
import { ProductCategoryService } from './service/productCategory.service';
import { ProductGroupService } from './service/productGroup.service';
import { tbProductGroup } from './models/entity/productGroup.entity';
import { tbProductSize } from './models/entity/productSize.entity';
import { ProductSizeService } from './service/productSize.service';
import { ProductController } from './controller/product.controller';
import { ProductCategory } from './controller/productCategory.controller';
import { ProductGroup } from './controller/productGroup.controller';
import { ProductSizeController } from './controller/productSize.controller';
import { tbItemWithQuantity } from './models/entity/itemWithQuantity';
import { tbProductAdon } from './models/entity/productAdOn.entity';
import { ProductAdOnService } from './service/productAdon.service';
import { ProductAdOnController } from './controller/productAdOn.controller';
import { tbDayTimeCategory } from './models/entity/dayTimeCategory.entity';
import { tbProductType } from './models/entity/productType.entity';
import { ProductTypesService } from './service/productTypes.service';
import { ProductTypesController } from './controller/productTypes.controller';
import { tbProductAndProductType } from './models/entity/product-and-productTypes.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      tbProduct,
      tbProductCategory,
      tbProductGroup,
      tbProductSize,
      tbItemWithQuantity,
      tbProductAdon,
      tbDayTimeCategory,
      tbProductType,
      tbProductAndProductType
    ])
  ],
  providers: [
    ProductService,
    ProductCategoryService,
    ProductGroupService,
    ProductSizeService,
    ProductAdOnService,
    ProductTypesService
  ],
  controllers: [
    ProductController,
    ProductCategory,
    ProductGroup,
    ProductSizeController,
    ProductAdOnController,
    ProductTypesController
  ]

})
export class ProductModule { }
