import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from '../model/user.dto';
import * as bcrypt from "bcrypt";
import * as jwt from 'jsonwebtoken';
import { tbResturant } from 'src/restaurant/models/entity/restaurant.entity';

@Injectable()
export class ResturantAuthService {
    constructor(@InjectRepository(tbResturant)
    private readonly resturantRepository: Repository<tbResturant>
    ) { }
    async resturantLogin(Iuser: UserDto): Promise<UserDto | null> {
        const FindMail = await this.resturantRepository.findOne({
            where: {
                customerEmail: Iuser.email
            },
            relations: ["subscription"]
        })
        if (!FindMail) {
            return {
                status: false,
                message: `User Not found`
            };
        }
     
        const verify = await bcrypt.compare(Iuser.password, FindMail.password)
        if (verify) {
            // const token = await this.createToken(Iuser)
            delete FindMail.password
            return {
                ...FindMail,
                status: true,
            }
        }
        return {
            email: Iuser.email,
            status: false,
            message: `Please Enter correct Password`
        };

    }
    createToken(Iuser: UserDto) {
        // const secret = this.configService.get('JWT_SECRET');
        const payload: UserDto = { email: Iuser.email }
        const secret = process.env.TOKEN_SECRET
        const token = jwt.sign(payload, secret, {
            expiresIn: process.env.expiresIn
        });
        return token;
    }

}
