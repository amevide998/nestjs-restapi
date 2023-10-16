import { IsEmail, IsNotEmpty, MaxLength } from "class-validator";

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail(undefined, {
    message: "Make sure to use a valid email address."
  })
  email: String

  @IsNotEmpty()
  @MaxLength(40, {
    message: `password is too long, maximum length is $constraint1`
  })
  password: String
}