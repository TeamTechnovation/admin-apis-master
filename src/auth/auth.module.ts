import { Module } from '@nestjs/common';
import {UserAuthService} from "./service/userauth.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import { tbUser } from 'src/admin/models/entity/user.entity';
import { ResturantAuthService } from './service/resturantAuth.service';
import { tbResturant } from 'src/restaurant/models/entity/restaurant.entity';
import { AuthController } from './controller/auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ tbUser,tbResturant ]),
  ],
  providers: [ UserAuthService,ResturantAuthService],
  controllers: [AuthController]
})
export class AuthModule {}
