import {
  Controller,
  Get,
  UseGuards,
  Request,
  Response,
  HttpStatus,
  Patch,
  Body,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "../auth/auth.guard";
import { WebResponse } from "../utils/response";
import { UpdateUserDto } from "../dto/update-password.dto";


@Controller("user")
export class UserController{

  constructor(private userService: UserService){}

  @UseGuards(AuthGuard)
  @Get('current')
  async current(@Request() req, @Response() res){
    const user = {
      sub: req['user'].sub,
      email: req['user'].email
    }

    return res.status(HttpStatus.OK)
      .json(new WebResponse(HttpStatus.OK, "im a teapot", user, null))
  }

  @UseGuards(AuthGuard)
  @Patch('update')
  @UsePipes(new ValidationPipe({transform: true}))
  async update(@Body() updateRequest: UpdateUserDto, @Response() res, @Request() req){
    const user = {
      sub: req['user'].sub,
      email: req['user'].email
    }
    await this.userService.update(updateRequest, user)

    return res.status(HttpStatus.OK)
      .json(new WebResponse(HttpStatus.OK, "success change password", null, null));
  }


}