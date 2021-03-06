import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { entities } from './entities';
import { modules } from './modules';

config();
@Module({
  imports: [
    TypeOrmModule.forRoot({ 
      type: 'postgres',
      host: process.env.DBHOST,
      port: Number.parseInt(process.env.PORT),
      username: process.env.DBUSERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      synchronize: true,
      entities: entities,
    }),
    ...modules
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
