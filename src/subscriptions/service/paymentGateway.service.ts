import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { tbPaymentGateways } from "../models/entity/paymentGateways.entity";
import { Observable, from } from "rxjs";
import { Repository } from "typeorm";
import { PaymentDto } from "../models/dto/paymentGateway.dto";

@Injectable()
export class PaymentGatewayService {
    constructor(
        @InjectRepository(tbPaymentGateways)
        private readonly paymentGatewayRepo: Repository<tbPaymentGateways>
    ) {}

    getAllPaymentGateway(): Observable<any> {
        return from(this.paymentGatewayRepo.find());
    }

    createPaymentGateway(gateway: PaymentDto): Observable<tbPaymentGateways> {
        return from(this.paymentGatewayRepo.save(gateway))
    }
}