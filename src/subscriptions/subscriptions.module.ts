import { Module } from '@nestjs/common';
import { SubscriptionsService } from './service/subscriptions.service';
import { tbSubscription } from './models/entity/subscriptions.entity';
import { tbPaymentGateways } from './models/entity/paymentGateways.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentGatewayService } from './service/paymentGateway.service';
import { tbCoupons } from './models/entity/coupon.entity';
import { CouponsService } from './service/coupons.service';
import { tbThirdPartyIntregrations } from './models/entity/thirdPartyIntegration.entity';
import { ThirdPartyIntegrationService } from './service/thirdPartyIntegration.service';
import { SubscriptionController } from './controller/subscription.controller';
import { CouponController } from './controller/coupon.controller';
import { PaymentGatewayController } from './controller/paymentGateway.controller';
import { ThirdPartyIntegrationsController } from './controller/thirdPartySubscription.controller';
import { tbSubscriptionSales } from './models/entity/subscriptionSales.entity';

@Module({
  imports:[TypeOrmModule.forFeature([tbSubscription, tbPaymentGateways, tbCoupons,tbThirdPartyIntregrations, tbSubscriptionSales])],
  providers: [
    SubscriptionsService,
    PaymentGatewayService,
    CouponsService,
    ThirdPartyIntegrationService
  ],
  controllers:[
    SubscriptionController,
    CouponController,
    PaymentGatewayController,
    ThirdPartyIntegrationsController
  ]
}) 
export class SubscriptionsModule {}
