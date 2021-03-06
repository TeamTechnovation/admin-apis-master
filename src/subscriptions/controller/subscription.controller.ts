import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { tbSubscription } from "../models/entity/subscriptions.entity";
import { SubscriptionsService } from "../service/subscriptions.service";
@ApiTags("subscription")
@Controller("subscription")
export class SubscriptionController {
    constructor(
        private readonly subscriptionService: SubscriptionsService,
    ){}
    @ApiResponse({ status: 200 })
    @Get()
    async getSubscriptions(){
        return await this.subscriptionService.getAllSubscriptions(100, 0, true)
    }
    @ApiResponse({ status: 201 })
    @Post("create")
    async createSubscription(@Body() subscription: tbSubscription) {
        return await this.subscriptionService.createSubscription(subscription);
    }
}