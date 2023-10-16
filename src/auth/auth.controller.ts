import {
  BadRequestException,
  Body,
  Controller, Get,
  HttpCode,
  HttpException,
  HttpStatus, InternalServerErrorException, Param,
  Post,
  Res,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { authProviders } from "./auth.providers";
import { CreateUserDto } from "../dto/create-user.dto";
import { json } from "express";
import { Response } from 'express';
import { WebResponse } from "../utils/response";
import { ResponseUserDto } from "../dto/user-response.dto";
import { LoginUserDto } from "../dto/user-login.dto";

@Controller("auth")
export class AuthController{

  constructor(private authService: AuthService){};

  @Post("signup")
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({transform: true}))
  async signup(@Body() createUserDto: CreateUserDto, @Res() res: Response ){
      const result = await this.authService.create(createUserDto);
      return res.status(HttpStatus.CREATED)
        .json(new WebResponse(HttpStatus.CREATED, "success, please check your email to verify your account", result, null));

  }

  @Get("verify/:userId/:uniqueString")
  async verify(@Param('userId') userId: string, @Param('uniqueString') uniqueString: string,@Res() res: Response ){
    try{
      await this.authService.verify(userId, uniqueString);
      return res.status(HttpStatus.OK)
        .json(new WebResponse(HttpStatus.OK, "verification success", null, null));
    }catch (err){
      throw new InternalServerErrorException(`Something bad happen`);
    }

  }
  @Post("signin")
  @UsePipes(new ValidationPipe({transform: true}))
  async signin(@Body() request: LoginUserDto, @Res() res: Response){
    const token = await this.authService.signin(request);
    return res.status(HttpStatus.OK)
      .json(new WebResponse(HttpStatus.OK, "success login", token, null))
  }
}