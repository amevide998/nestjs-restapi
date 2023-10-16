import { Body, Controller, HttpStatus, Post, Response } from "@nestjs/common";
import { FormCommunityDto } from "../dto/form-community.dto";
import { FormCommunityService } from "./form-community.service";
import { WebResponse } from "../utils/response";

@Controller("form")
export class FormCommunityController {

  constructor(private formCommunityService: FormCommunityService) {
  }

  @Post("post")
  async create(@Body() formRequest: FormCommunityDto, @Response() res){
    await this.formCommunityService.create(formRequest);
    return res.status(HttpStatus.OK)
      .json(new WebResponse(HttpStatus.OK, "success post form community", null, null))
  }
}