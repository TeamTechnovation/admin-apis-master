import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { tbCustomers } from '../models/entity/customer.entity';
import { CustomerService } from '../service/customer.service';
@ApiTags("customer")
@Controller('customer')
export class CustomerController {
    constructor(
        private readonly customerService: CustomerService
    ){}

    @ApiResponse({ status: 200 })
    @Get(":restaurant")
    getAllCustomers(@Param("restaurant") restaurant: number) {
        return this.customerService.getAllCustomers(restaurant)
    }

    @ApiResponse({ status: 201 })
    @Post("create")
    createCustomer(@Body() customer: tbCustomers) {
        return this.customerService.createCustomer(customer)
    }

    @Delete(":id")
    deleteCustomer(@Param("id") id: number) {
        return this.customerService.deleteCustomer(id)
    }

    @Put(":id")
    updateCustomer(@Param("id") id: number, @Body() data: tbCustomers) {
        return this.customerService.updateCustomer(id, data)
    }
}
