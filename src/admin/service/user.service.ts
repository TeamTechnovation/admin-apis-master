import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { tbUser } from '../models/entity/user.entity';
import { Repository, UpdateResult, DeleteResult, MoreThan } from 'typeorm';
import { Observable, from } from 'rxjs';
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(tbUser)
    private readonly userRepository: Repository<tbUser>,
  ) { }

  //create new user...
  async createUser(Iuser: tbUser): Promise<any> {
    const hashPassword = await bcrypt.hash(Iuser.password, 12);
    Iuser.password = hashPassword
    return await this.userRepository.save({...Iuser});
  }


  //read user...
  getSingeUser(userId: number): Observable<any> {
    return from(this.userRepository.findOne({ where: { id: userId } }));
  }



  //update the user...
  async updateUser(id: number,Iuser: tbUser): Promise<UpdateResult | null> {
    return await this.userRepository.update(id, { ...Iuser });
  }

  //get all user...
  getAllUsers(after: number, take: number): Observable<any> {
    return from(this.userRepository.find({ relations: ['role'], where: { id: MoreThan(after) }, take: take }))
  }

  //update the user...
  // async updateUser(Iuser: IUser, userId: number): Promise<UpdateResult> {
  //     return await this.userRepository.update(userId, { ...Iuser });
  // }

  //delete user...
  async deleteUser(id: number): Promise<any> {
    const UserId = await this.userRepository.findOne({ where :{ id : id }})
    if (UserId.flag === true){
      return await this.userRepository.update(id,{ flag :false}).then(() =>{ return {status : false, msg : "Admin deleted"} })
    }else{
      return {status : false, msg : "Already Admin deleted"}
    }
  }
}
