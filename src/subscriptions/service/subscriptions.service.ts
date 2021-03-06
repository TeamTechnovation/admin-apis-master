import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { tbSubscription } from '../models/entity/subscriptions.entity';
import { Repository, DeleteResult, UpdateResult, MoreThan } from 'typeorm';
import { tbPaymentGateways } from '../models/entity/paymentGateways.entity';
import { tbThirdPartyIntregrations } from '../models/entity/thirdPartyIntegration.entity';
import { SubscriptionDto } from '../models/dto/subscription.dto';

@Injectable()
export class SubscriptionsService {
    constructor(
        @InjectRepository(tbSubscription)
        private readonly subscriptionRepo: Repository<tbSubscription>
    ) { }

    async createSubscription(subscription: tbSubscription): Promise<tbSubscription>{
        subscription.gateways = subscription.gatewaysIds.map(a => new tbPaymentGateways({id: a}))
        subscription.integrations = subscription.integrationsIds.map(a => new tbThirdPartyIntregrations({id: a}))
        return await this.subscriptionRepo.save(subscription)
    }

    async deleteSubscription(subscriptionId: number): Promise<DeleteResult> {
        return await this.subscriptionRepo.delete(subscriptionId);
    }

    async deleteSubscriptionsBulk(subscriptionIds: [number]): Promise<DeleteResult>{
        return await this.subscriptionRepo.delete(subscriptionIds);
    }

    async updateSubscription(subscription: SubscriptionDto, subscriptionId: number): Promise<UpdateResult>{
        subscription.gateways = subscription.gatewaysIds.map(a => new tbPaymentGateways({id: a}))
        return await this.subscriptionRepo.update(subscriptionId, subscription)
    }

    async getAllSubscriptions(take: number, after: number, onlyActive: Boolean): Promise<tbSubscription[]>{
        if(onlyActive){
            return await this.subscriptionRepo.find({take: take, where: {id: MoreThan(after), Status: true}})        
        }
        return await this.subscriptionRepo.find({take: take, where: {id: MoreThan(after)}})
    }

    async getSingleSubscription(subscriptionId: number): Promise<tbSubscription>{
        return await this.subscriptionRepo.findOne({where: {id: subscriptionId}})
    }
}
