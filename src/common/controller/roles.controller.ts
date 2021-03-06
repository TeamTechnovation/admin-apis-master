import { Body, Controller, Get, Post } from "@nestjs/common";
import { create } from "domain";
import { tbRole } from "../models/entity/roles.entity";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { RolesService } from "../service/roles.service";
@ApiTags("roles")
@Controller("roles")
export class RolesController {
    constructor(private readonly roleService: RolesService) {}
    @ApiResponse({ status: 200 })
    @Get()
    async getRoles() {
        return this.roleService.getAllRoles()
    }
    @Post("create")
    async createRole(@Body() role: tbRole) {
        return this.roleService.createRole(role)
    }
}