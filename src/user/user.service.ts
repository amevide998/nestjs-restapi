import { BadRequestException, Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Model } from "mongoose";
import { User } from "../interface/user.interface";
import { UpdateUserDto } from "../dto/update-password.dto";
import { UserExtractDto } from "../dto/user-extract.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
  ) {};

  async update(request: UpdateUserDto, user: UserExtractDto){
    // update password
    if(request.newPassword === request.oldPassword){
      throw new BadRequestException(`new password cannot be same as old password`);
    }
    const userDb = await this.userModel.findById(user.sub)

    if(!userDb){
      throw new NotFoundException(`not found`);
    }

    // cek old password
    if(bcrypt.compareSync(request.oldPassword.toString(), userDb.hash.toString())){
      await this.userModel.findByIdAndUpdate(user.sub, {
        hash: bcrypt.hashSync(request.newPassword.toString(), 10)
      })
    }else{
      throw new UnauthorizedException(`old password doesnt match`);
    }

  }



}