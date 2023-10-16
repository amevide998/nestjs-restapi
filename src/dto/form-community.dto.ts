import { IsEmail, IsNotEmpty } from "class-validator";

export class FormCommunityDto  {
  @IsNotEmpty()
  communityName: string

  @IsNotEmpty()
  communityField: string

  @IsNotEmpty()
  communityContact: string

  @IsEmail()
  @IsNotEmpty()
  email: string


  instagram: string
}
