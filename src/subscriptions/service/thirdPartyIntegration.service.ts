import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { from, Observable } from "rxjs";
import { Repository } from "typeorm";
import { ThirdPartyIntegrationDto } from "../models/dto/thirdPartyIntegration.dto";
import { tbThirdPartyIntregrations } from "../models/entity/thirdPartyIntegration.entity";

@Injectable()
export class ThirdPartyIntegrationService{
    constructor(
        @InjectRepository(tbThirdPartyIntregrations)
        private readonly thirdPartyIntegrationRepo: Repository<tbThirdPartyIntregrations>
    ){}

    getAll(): Observable<any> {
        return from(this.thirdPartyIntegrationRepo.find());
    }

    create(integration: ThirdPartyIntegrationDto): Observable<any> {
        return from(this.thirdPartyIntegrationRepo.save(integration))
    }
}