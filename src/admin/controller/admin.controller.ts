import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { tbUser } from "../models/entity/user.entity";
import { UserService } from "../service/user.service";

@ApiTags("admin")
@Controller("admin")
export class AdminController {
    constructor(private readonly userService: UserService) {}

    @ApiResponse({ status: 200 })
    @Get("users/:after/:take")
    async getAllUsers(@Param("after") after: number, @Param("take") take: number) {
        return await this.userService.getAllUsers(after, take)
    }

    @ApiResponse({ status: 201 })
    @Post("user/create")
    async createUser(@Body() user: tbUser) {
        return await this.userService.createUser(user)
    }

    @ApiResponse({ status: 201 })
    @Put("user/:id")
    async updateAdmin(@Body() user: tbUser, @Param('id') id:number) {
        return await this.userService.updateUser(id,user)
    }

    @ApiResponse({ status: 201 })
    @Delete("user/delete/:id")
    async delete(@Param("id") id: number): Promise<any> {
        return await this.userService.deleteUser(id)
    }
}