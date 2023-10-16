import { BadRequestException, Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Model } from "mongoose";
import { User } from "../interface/user.interface";
import { CreateUserDto } from "../dto/create-user.dto";
import * as bcrypt from 'bcrypt';
import { ResponseUserDto } from "../dto/user-response.dto";
import sendMail from "../utils/sendMail.utils";
import { EmailVerification } from "../interface/email-verification.interface";
import { v4 } from "uuid";
import { LoginUserDto } from "../dto/user-login.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService{
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
    
    @Inject('VERIFICATION_MODEL')
    private verificationModel: Model<EmailVerification>,

    private jwtService: JwtService
  ) {}
    async create(createUserDto: CreateUserDto): Promise<ResponseUserDto>{

      // cek if email exists in database
      const userDb = await this.userModel.findOne({email: createUserDto.email})
      if(userDb){
        throw new BadRequestException("email already exists");
      }

      // save user to database
      const createdUser = new this.userModel(this.mapToUser(createUserDto));
      const user = await createdUser.save();

      // send email verification
      try{
        const uniqueString = v4() + user._id.toString();
        const emailVerification: EmailVerification = {
          userId: user._id.toString(),
          uniqueString: uniqueString,
          createdAt: Date.now(),
          expiresAt: Date.now() + 21600000
        }
        // save verification to database
        try{
          const createdEmailVerification = new this.verificationModel(emailVerification)
          await createdEmailVerification.save();
        }catch (err){
          console.error(`something error while save email verification to database`)
        }
        await sendMail(user._id.toString(),uniqueString,user.email.toString())
      }catch (err){
        console.error(`something wrong while send email :  ${err}`)
      }
    return new ResponseUserDto(user.email);
  }

  async verify(userId: string, uniqueString: string){
    // cek user exists
    const userDb = await this.userModel.findById(userId)
    console.debug(`verify user, cek usedb by id: ${userDb.email}`);

    if(!userDb){
      throw new NotFoundException(`user not found`);
    }

    // cek uniqueString exists
    const uniqueStringDb = await this.verificationModel.findOne({userId : userId});
    if(!uniqueStringDb){
      throw new NotFoundException(`email verification not found`);
    }

    // cek expires uniqueString
    console.debug(`verify user, cek email verification createdAt: ${uniqueStringDb.createdAt}, expiresAt: ${uniqueStringDb.expiresAt}`);
    if (Date.now() > uniqueStringDb.expiresAt){
      console.info(`email verification expires, user email : ${userDb.email}`);
      await this.verificationModel.deleteMany({userId: userDb._id})
      await this.userModel.deleteMany({email: userDb.email})
      throw new BadRequestException(`email verification has been expired, please sign up again`);
    }else {
      // activate user
      await this.userModel.findByIdAndUpdate(userDb._id, {verified: true});
      await this.verificationModel.deleteMany({userId: userDb._id});
    }
  }

  async signin(request: LoginUserDto){
    // get user from db
    const userDb = await this.userModel.findOne({email: request.email})
    if(!userDb){
      throw new BadRequestException(`email & password doesn't match`);
    }
    // cek password
    if(bcrypt.compareSync(request.password.toString(), userDb.hash.toString())){
      console.log(`password match user - ${request.email}`);
      const payload = {sub: userDb._id, email: userDb.email};

      return {
        accessToken: await this.jwtService.signAsync(payload)
      }


    }else {
      console.log(`password dont macth - ${request.email}`);
      throw new BadRequestException(`email & password doesn't match`);

    }
  }

  mapToUser = (user: CreateUserDto) : User => {
    return {
      email: user.email,
      hash: bcrypt.hashSync(user.password.toString(), 10),
      createdAt: new Date(Date.now()),
      updatedAt: null,
      verified: false
    }
  }

}
