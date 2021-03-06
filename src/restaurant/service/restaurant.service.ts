import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { tbResturant } from '../models/entity/restaurant.entity';
import { Repository, UpdateResult, DeleteResult, MoreThan, In } from 'typeorm';
import * as bcrypt from "bcrypt";
import { RestaurantDto } from '../models/dto/restaurant.dto';
import { tbRestaurantUser } from '../models/entity/user.entity';
import { tbRestaurantRoles } from '../models/entity/roles.entity';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { UserDto } from 'src/auth/model/user.dto';
import { tbBooking } from '../models/entity/booking.entity';
import { tbOrders } from '../models/entity/orders.entity';
import { tbSocialPage } from '../models/entity/pages.entity';
import { tbUploadedPosts } from '../models/entity/uploadedPosts.entity';
import { tbKot } from '../models/entity/kot.entity';
import { tbRestaurantFloor } from '../models/entity/floor.entity';
import { tbTempRestaurant } from '../models/entity/restaurant.temp.enity';
import { config } from "dotenv";
import * as SendGrid from "@sendgrid/mail";
config()

@Injectable()
export class RestaurantService {
    constructor(
        @InjectRepository(tbResturant)
        private readonly restaurantRepository: Repository<tbResturant>,
        @InjectRepository(tbRestaurantUser)
        private readonly retaurantUserRepo: Repository<tbRestaurantUser>,
        @InjectRepository(tbRestaurantRoles)
        private readonly restaurantRolesRepo: Repository<tbRestaurantRoles>,
        private readonly jwtService: JwtService,
        @InjectRepository(tbBooking)
        private readonly bookingRepository: Repository<tbBooking>,
        @InjectRepository(tbOrders)
        private readonly orderRepository: Repository<tbOrders>,
        @InjectRepository(tbSocialPage)
        private readonly socialPageRepository: Repository<tbSocialPage>,
        @InjectRepository(tbUploadedPosts)
        private readonly uploadedPostRepository: Repository<tbUploadedPosts>,
        @InjectRepository(tbKot)
        private readonly kotRepo: Repository<tbKot>,
        @InjectRepository(tbRestaurantFloor)
        private readonly restaurantFloor: Repository<tbRestaurantFloor>,
        @InjectRepository(tbTempRestaurant)
        private readonly tempRestaurantRepo: Repository<tbTempRestaurant>
    ) { }

    getSomeStrongPassword() {
        return Math.random().toString(20).substr(2, 8)
    }
    async createRestaurant(restaurant: RestaurantDto): Promise<tbResturant> {
        try {
            var password = this.getSomeStrongPassword()
            const hashPassword = await bcrypt.hash(password, 12);
            restaurant.password = hashPassword;
            restaurant.hasOutlets = restaurant.outlets.length != 0

            //if everything goes right then send mail to restaurant owner...
            await this.SendMailToResturent(password, restaurant)
            return await this.restaurantRepository.save(restaurant);
        } catch (error) {
            throw new HttpException("Cannot Create Restaurant", HttpStatus.FORBIDDEN)
        }
    }
    async issueRestaurantId() {
        try {
            const savedRestaurant = await this.tempRestaurantRepo.save({})
            return savedRestaurant.id
        } catch (error) {
            throw new HttpException("Cannot Issue Restaurant Id", HttpStatus.FORBIDDEN)
        }
    }
    async updateRestaurant(restaurant: RestaurantDto, restaurantId: number): Promise<UpdateResult> {
        return await this.restaurantRepository.update(restaurantId, restaurant);
    }
    async deleteRestaurant(restaurantId: number | [number]): Promise<DeleteResult> {
        return await this.restaurantRepository.delete(restaurantId);
    }
    async getAllRestaurant(after: number, take: number): Promise<tbResturant[]> {
        return await this.restaurantRepository.find({
            take: take,
            where: {
                id: MoreThan(after)
            },
            relations: ["outlets"]
        });
    }
    async getSingleRestaurant(restaurantId: number): Promise<tbResturant> {
        return await this.restaurantRepository.findOne({ where: { id: restaurantId } })
    }
    async createRestaurantUser(user: tbRestaurantUser) {
        return await this.retaurantUserRepo.save(user)
    }
    async getUsers(restaurantId: number) {
        return await this.retaurantUserRepo.find({
            where: {
                restaurant: restaurantId
            },
            relations: ["role"]
        })
    }
    async getRoles() {
        return await this.restaurantRolesRepo.find()
    }
    private async validate(email: string): Promise<any> {
        if (email) {
            return await this.retaurantUserRepo.find({ email: email })
        }

    }
    async restaurantLogin(email: string, password: string) {
        return await this.validate(email).then(async (user) => {
            if (!user) {
                throw new HttpException(`username doesn't exist`, HttpStatus.BAD_REQUEST);
            }
            else {
                const verify = await this.verifyPassword(user[0].password, password)
                if (verify == true) {
                    let payload = `${user.id} ${user.fullname} ${user.email}`;
                    const accessToken = this.jwtService.sign(payload);
                    return {
                        status: true,
                        expires_in: 3600,
                        access_token: accessToken,
                        msg: "sucess",
                        data: {
                            userid: user[0].id,
                            fullname: user[0].fullname,
                            email: user[0].email
                        },
                    };
                } else {
                    throw new HttpException('Incorrect Password', HttpStatus.BAD_REQUEST);
                }
            }
        });
    }
    verifyPassword = (DbPassword, Ipassword) => {
        if (DbPassword == Ipassword) {
            return true;
        } else {
            return false;
        }
    }
    async SendMailToResturent(password: any, restaurant: RestaurantDto): Promise<any> {
        SendGrid.setApiKey(process.env.SENDGRID_API_KEY)
        SendGrid
            .send({
                to: restaurant.customerEmail,
                from: "sales@insightops.in",
                templateId: "d-d3d036e2fe1541d9a899ee4f9ee62046",
                dynamicTemplateData: {
                    username: restaurant.customerEmail,
                    password: password,
                }
            })
            .then((u) => {
                return { status: true, message: "password is send to" + restaurant.customerEmail };
            })
            .catch((error) => {
                return { error: "sent mail failed" };
            })
    }
    async teamLogin(user: UserDto) {
        var restaurantUser = await this.retaurantUserRepo.findOne({
            where: {
                email: user.email
            },
            relations: ["role", "restaurant", "outlet"]
        })
        if (restaurantUser == undefined) {
            throw new HttpException({
                status: false,
                message: "User not found"
            },400)
            // return {
            //     status: false,
            //     message: "User not found"
            // }
        } else if (restaurantUser.password == user.password) {
            delete restaurantUser.password
            return {
                status: true,
                user: restaurantUser
            }
        } else {
            throw new HttpException({
                status: false,
                message: "Wrong Password"
            },403)
            // return {
            //     status: false,
            //     message: "Wrong Password"
            // }
        }
    }
    async book(book: tbBooking) {
        return await this.bookingRepository.save(book)
    }
    async order(order: tbOrders) {
        return await this.orderRepository.save(order)
    }

    async checkoutOrder(order: tbOrders) {
        return await this.orderRepository.update(order.id, order)
    }

    async getOrders(restaurant: number) {
        return await this.orderRepository.find({
            where: {
                restaurant: restaurant
            },
            relations: ["section", "floor", "area", ]
        })
    }

    async getProductsByRestaurant(restaurantId: number) {
        return await this.restaurantRepository.findOne({
            where: {
                id: restaurantId,
            },
            select: ["id"],
            relations: ["products"]
        })
    }
    async getProductGroupByRestaurant(restaurantId: number) {
        return await this.restaurantRepository.findOne({
            relations: ["productGroup"],
            select: ["id"],
            where: {
                id: restaurantId
            }
        })
    }
    async getProductTypeByRestaurant(id: number) {
        return await this.restaurantRepository.findOne({
            where: {
                id: id,
            },
            select: ["id"],
            relations: ["productType"]
        })
    }
    async updateRestaurantInfo(body: any, restaurantId: number) {
        return await this.restaurantRepository.update({ id: restaurantId }, body)
    }
    async createFacebookPage(body: any) {
        return await this.socialPageRepository.save(body)
    }
    async updateFacebookPage(body: any, restaurantId: number) {
        return await this.socialPageRepository.update({ restaurant: restaurantId, type: "FACEBOOK" }, body)
    }
    async getFacebookPage(restaurantId: number) {
        return await this.socialPageRepository.find({
            restaurant: restaurantId
        })
    }
    async createLinkedInPage(body: any) {
        return await this.socialPageRepository.save(body)
    }
    async updateLinkedInPage(body: any, restaurantId: number) {
        return await this.socialPageRepository.update({ restaurant: restaurantId, type: "LINKEDIN" }, body)
    }
    async getLinkedInPage(restaurantId: number) {
        return await this.socialPageRepository.find({
            restaurant: restaurantId
        })
    }
    async createPost(body: any) {
        return await this.uploadedPostRepository.save(body)
    }
    async createTelegramPage(body: any) {
        return await this.socialPageRepository.save(body)
    }
    async getCreatedPosts(restaurantId: number) {
        return await this.uploadedPostRepository.find({
            where: {
                restaurant: restaurantId
            }
        })
    }
    async getBluePrintOfRestaurant(restaurantId: number) {
        return await this.restaurantRepository.findOne({
            where: {
                id: restaurantId
            },
            select: ["id"],
            relations: ["floors", "floors.areas", "floors.areas.sections"]
        })
    }
    async loginKot(body: any) {
        const kot = await this.kotRepo.findOne({
            where: {
                username: body.username,
                // restaurant: body.restaurantId
            },
            relations: ["productGroup", "floors"]
            // "restaurant"]
        })
        if (kot && kot.password == body.password) {
            delete kot.password

            //find peers of floor...
            const peerKots = await this.restaurantFloor.find({
                where: {
                    id: In(kot.floors.map(floor => floor.id))
                },
                relations: ["kots", "kots.floors"],
            })
            peerKots.forEach(floor => {
                if (floor.kots.filter(floorKot => floorKot.id !== kot.id).length > 0) {
                    kot.floors.find(a => a.id == floor.id)["hasPeer"] = true
                }
            });
            return {
                message: "User Logged In",
                statusCode: "200",
                data: kot
            }
        } else {
            throw new HttpException({

                message: "Not Found",
                statusCode: "403",
            }, 403)
        }
    }
}
