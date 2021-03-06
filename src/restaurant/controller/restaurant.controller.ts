import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { UserDto } from "src/auth/model/user.dto";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CommonService } from "src/common/service/common.service";
import { RestaurantDto } from "../models/dto/restaurant.dto";
import { tbRestaurantUser } from "../models/entity/user.entity";
import { OutletService } from "../service/outlets.service";
import { RestaurantService } from "../service/restaurant.service";
import { tbBooking } from "../models/entity/booking.entity";
import { tbOrders } from "../models/entity/orders.entity";
@ApiTags("restaurant")
@Controller("restaurant")
export class RestaurantController {
    constructor(
        private readonly restaurantService: RestaurantService,
        private readonly outletService: OutletService,
        private readonly commonService: CommonService
    ) { }

    @Post("team/login")
    teamLogin(@Body() user: UserDto) {
        return this.restaurantService.teamLogin(user)
    }

    @ApiResponse({ status: 201 })
    @Post("create")
    async createRestaurant(@Body() restDto: RestaurantDto) {
        const savedRestaurant = await this.restaurantService.createRestaurant(restDto);
        restDto.outlets.map(outlet => outlet.restaurant = savedRestaurant.id)

        //saving sales...
        this.commonService.createSales({
            billingFrom: restDto.billingFrom,
            coupon: restDto.couponId,
            discount: restDto.discount,
            subscription: restDto.subscriptionId,
            discountType: restDto.discountType,
            restaurant: savedRestaurant.id
        })
        const outlets = restDto.outlets
        await this.outletService.createOutlets(outlets);
        return savedRestaurant
    }

    @Get("issue")
    issueRestaurantId() {
        return this.restaurantService.issueRestaurantId()
    }
    
    @ApiResponse({ status: 200 })
    @Get()
    async getAllRestaurants() {
        return await this.restaurantService.getAllRestaurant(0, 100)
    }

    @ApiResponse({ status: 200 })
    @Get("outletOf/:restaurantId")
    async getOutletsOf(@Param("restaurantId") restaurantId: string) {
        return await this.outletService.getOutletsOf(parseInt(restaurantId))
    }

    @Post("user")
    async createUser(@Body() user: tbRestaurantUser) {
        return await this.restaurantService.createRestaurantUser(user)
    }
    @Get("user/:restaurantId")
    async getUsers(@Param("restaurantId") restaurantId: number) {
        return await this.restaurantService.getUsers(restaurantId)
    }

    @Get("roles")
    async getRoles() {
        return await this.restaurantService.getRoles()
    }
    @Post("userLogin")
    async userLogin(@Body() { email, password }: tbRestaurantUser): Promise<any> {
        return await this.restaurantService.restaurantLogin(email, password)
    }

    @Post("booking")
    async createBooking(@Body() book: tbBooking) {
        return await this.restaurantService.book(book)
    }

    @Post("order")
    async createOrder(@Body() order: tbOrders) {
        return await this.restaurantService.order(order)
    }

    @Put("order/checkout")
    async checkoutOrder(@Body() body: tbOrders) {
        return await this.restaurantService.checkoutOrder(body)
    }

    @Get("orders/:restaurantId")
    getOrdersFromRestaurant(@Param("restaurantId") restaurantId: number) {
        return this.restaurantService.getOrders(restaurantId)
    }

    @Get("products/:restaurantId")
    getProductByRestaurant(@Param("restaurantId") restaurantId: number) {
        return this.restaurantService.getProductsByRestaurant(restaurantId)
    }

    @Get("productGroup/:restaurantId")
    getProductGroupByRestaurant(@Param("restaurantId") restaurantId: number) {
        return this.restaurantService.getProductGroupByRestaurant(restaurantId)
    }

    @Get("productType/:restaurantId")
    getProductTypeByRestaurant(@Param("restaurantId") restaurantId: number) {
        return this.restaurantService.getProductTypeByRestaurant(restaurantId)
    }

    @Put("update.info/:restaurantId")
    updateInfo(@Body() body: any, @Param("restaurantId") restaurantId: number) {
        return this.restaurantService.updateRestaurantInfo(body, restaurantId)
    }

    @Post("FACEBOOK.page")
    createFacebookPage(@Body() body: any) {
        return this.restaurantService.createFacebookPage(body)
    }

    @Post("LINKEDIN.page")
    createLinkedInPage(@Body() body: any) {
        return this.restaurantService.createLinkedInPage(body)
    }

    @Post("TELEGRAM.page")
    createTelegramPage(@Body() body: any) {
        return this.restaurantService.createTelegramPage(body)
    }

    @Put("update/facebook.page/:restaurantId")
    updateFacebookPage(@Body() body: any, @Param("restaurantId") restaurantId: number) {
        return this.restaurantService.updateFacebookPage(body, restaurantId)
    }

    @Put("update/linkedIn.page/:restaurantId")
    updateLinkedInPage(@Param("restaurantId") restaurantId: number, @Body() body: any) {
        return this.restaurantService.updateLinkedInPage(body, restaurantId)
    }

    @Get("pages/:restaurantId")
    getLinkedPage(@Param("restaurantId") restaurantId: number) {
        return this.restaurantService.getLinkedInPage(restaurantId)
    }

    @Post("create/post")
    createPost(@Body() body: any) {
        return this.restaurantService.createPost(body)
    }

    @Get("post/:restaurantId")
    getCreatedPost(@Param("restaurantId") restaurantId: number) {
        return this.restaurantService.getCreatedPosts(restaurantId)
    }

    @Get("blueprint/:restaurantId")
    async getBluePrintOfOutlet(@Param("restaurantId") restaurantId: number) {
        return await this.restaurantService.getBluePrintOfRestaurant(restaurantId)
    }

    @Post("login/kot")
    loginKot(@Body() body: any){
        return this.restaurantService.loginKot(body)
    }
}
