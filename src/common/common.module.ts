import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { tbRightOnFeature } from './models/entity/RightOnFeatures.entity';
import { tbUser } from 'src/admin/models/entity/user.entity';
import { tbRole } from './models/entity/roles.entity';
import { tbRBACFeatures } from './models/entity/RBAC_features.entity';
import { CommonService } from './service/common.service';
import { RolesService } from './service/roles.service';
import { RolesController } from './controller/roles.controller';
import { tbSales } from './models/entity/sales.entity';
import { SalesController } from './controller/sales.controller';
import { CallbackController } from './controller/callbacks.controller';
import { ServiceController } from './controller/service.controller';
import { tbStores } from 'src/aggregators/models/entity/stores.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([tbRightOnFeature, tbRole, tbUser, tbRBACFeatures, tbSales, tbStores]),
  ],
  providers: [CommonService, RolesService],
  controllers: [RolesController, SalesController, CallbackController, ServiceController]
})
export class CommonModule { }
