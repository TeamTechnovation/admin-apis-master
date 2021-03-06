import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { tbCustomers } from '../models/entity/customer.entity';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(tbCustomers)
        private readonly customerRepository: Repository<tbCustomers>
    ){}

    async createCustomer(customer: tbCustomers) {
        return await this.customerRepository.save(customer)
    }

    async getAllCustomers(restaurant: number) {
        return await this.customerRepository.find({
            where: {
                restaurant: restaurant
            }
        })
    }

    async deleteCustomer(id: number) {
        return (await this.customerRepository.delete(id)).affected > 0
    }

    async updateCustomer(id: number, data: tbCustomers) {
        return (await this.customerRepository.update(id, data)).affected > 0
    }
}
