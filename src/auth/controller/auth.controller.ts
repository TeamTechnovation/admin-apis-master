import { Body, Controller, Post } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { AdminDto } from "../model/dto/admin.dto";
import { ResturantAuthService } from "../service/resturantAuth.service";
import { UserAuthService } from "../service/userauth.service";
@ApiTags("auth")
@Controller("auth")
export class AuthController {
    constructor(
        private readonly authService: UserAuthService,
        private readonly restAuthService: ResturantAuthService

    ){}
    @ApiResponse({ status: 200 })
    @Post('admin')
    adminLogin(@Body() adminDto: AdminDto){
        return this.authService.login(adminDto)
    }
    @ApiResponse({ status: 200 })
    @Post('restaurant')
    restaurantlogin(@Body() adminDto: AdminDto){
        return this.restAuthService.resturantLogin(adminDto)
    }
}