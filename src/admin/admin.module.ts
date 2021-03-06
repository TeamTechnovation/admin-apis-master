import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { tbRightOnFeature } from 'src/common/models/entity/RightOnFeatures.entity';
import { tbRole } from 'src/common/models/entity/roles.entity';
import { tbUser } from './models/entity/user.entity';
import { tbRBACFeatures } from 'src/common/models/entity/RBAC_features.entity';
import { AdminController } from './controller/admin.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([tbRightOnFeature, tbRole, tbUser, tbRBACFeatures]),
  ],
  providers: [ UserService],
  controllers: [AdminController]
})
export class AdminModule {}
