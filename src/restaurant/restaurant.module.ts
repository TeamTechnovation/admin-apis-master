import { Module } from '@nestjs/common';
import { RestaurantService } from './service/restaurant.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { tbResturant } from './models/entity/restaurant.entity';
import { tbOutlet } from './models/entity/outlets.entity';
import { OutletService } from './service/outlets.service';
import { RestaurantController } from './controller/restaurant.controller';
import { tbSales } from 'src/common/models/entity/sales.entity';
import { CommonModule } from 'src/common/common.module';
import { CommonService } from 'src/common/service/common.service';
import { tbRestaurantRoles } from './models/entity/roles.entity';
import { tbRestaurantUser } from './models/entity/user.entity';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';
import { tbRestaurantSection } from './models/entity/section.entityt';
import { tbRestaurantFloor } from './models/entity/floor.entity';
import { tbRestaurantArea } from './models/entity/area.entity';
import { ResturantManagementController } from './controller/resturant-management.controller';
import { ResturantManagementService } from './service/resturant-management.service';
import { tbTable } from './models/entity/table.entity';
import { tbBooking } from './models/entity/booking.entity';
import { tbRestaurantDocuments } from './models/entity/documents.entity';
import { OutletController } from './controller/outlet.controller';
import { tbOrders } from './models/entity/orders.entity';
import { tbProductInOrder } from './models/entity/productsInOrder.entity';
import { tbSocialPage } from './models/entity/pages.entity';
import { tbUploadedPosts } from './models/entity/uploadedPosts.entity';
import { tbKot } from './models/entity/kot.entity';
import { tbSubscriptionSales } from 'src/subscriptions/models/entity/subscriptionSales.entity';
import { tbTempRestaurant } from './models/entity/restaurant.temp.enity';
import { tbStores } from 'src/aggregators/models/entity/stores.entity';
require("dotenv").config();

@Module({
  imports: [
    TypeOrmModule.forFeature([
      tbResturant,
      tbOutlet,
      tbSales, 
      tbRestaurantRoles,
      tbRestaurantUser,
      tbRestaurantSection,
      tbRestaurantFloor,
      tbRestaurantArea,
      tbTable,
      tbBooking,
      tbRestaurantDocuments,
      tbOrders,
      tbProductInOrder,
      tbSocialPage,
      tbUploadedPosts,
      tbKot,
      tbSubscriptionSales,
      tbTempRestaurant,
      tbStores
    ]), 
    JwtModule.register({
      privateKey: process.env.sekrectKey,
    }),
    CommonModule
  ],
  providers: [
    RestaurantService,
    OutletService,
    CommonService,
    ResturantManagementService
  ],
  controllers: [
    RestaurantController,ResturantManagementController,OutletController
  ]
})
export class RestaurantModule { }
