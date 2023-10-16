import { HttpException, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Model } from "mongoose";
import { FormCommunity } from "../interface/form-community.interface";
import { FormCommunityDto } from "../dto/form-community.dto";

@Injectable()
export class FormCommunityService{
  constructor(
    @Inject("COMMUNITY_FORM_MODEL")
    private formCommunityModel: Model<FormCommunity>
  ) {}

  async create(request: FormCommunityDto){
    const newFormCommunity: FormCommunity = {
      communityName: request.communityName,
      communityField:  request.communityField,
      communityContact: request.communityContact,
      email: request.email,
      instagram: request.instagram,
      createdAt: new Date()
    }
    try{
      const createdFormCommunity = new this.formCommunityModel(newFormCommunity);
      await createdFormCommunity.save();
    }catch (err){
      throw new InternalServerErrorException(`someting wrong: ${err.message}`)
    }
  }

}