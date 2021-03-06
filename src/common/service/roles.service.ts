import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { tbRole } from '../models/entity/roles.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleDto } from '../models/dto/role.dto';
import { Observable, from } from 'rxjs';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(tbRole)
        private readonly rolesRepository: Repository<tbRole>
        ) {}
    
    createRole(Irole: RoleDto): Observable<RoleDto>{
        return from(this.rolesRepository.save(Irole));
    }

    getAllRoles(): Observable<RoleDto[]>{
        return from(this.rolesRepository.find())
    }
}
