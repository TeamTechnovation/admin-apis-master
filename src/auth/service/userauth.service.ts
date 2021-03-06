import { Injectable, NotFoundException } from '@nestjs/common';
import { tbUser } from 'src/admin/models/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from '../model/user.dto';
import * as bcrypt from "bcrypt";
import * as jwt from 'jsonwebtoken';
import { AdminDto } from '../model/dto/admin.dto';
@Injectable()
export class UserAuthService {
    constructor(
        @InjectRepository(tbUser)
        private readonly userRepository: Repository<tbUser>,

    ) { }

    async login(Iuser: AdminDto): Promise<any> {
        const FindMail = await this.userRepository.findOne({
            where: {
                email: Iuser.email
            },
        })
        if (!FindMail) {
            return {
                status: false,
                message: `User Not found`
            };
        }
        if (Iuser.password === FindMail.password) {
            return {
                id: FindMail.id,
                firstname: FindMail.firstName,
                lastname: FindMail.lastName,
                email: FindMail.email,
                status: true,
                phone: FindMail.phone,
                icp: FindMail.icp
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
    getUserByEmail(email: string) {
        return this.userRepository.findOne({ email })
    }
}
