import { IsEmail, IsStrongPassword, MaxLength } from "class-validator";

export class CreateUserDto {
  @IsEmail(undefined, {
    message: "Make sure to use a valid email address."
  })
  email: String

  @MaxLength(40, {
    message: `password is too long, maximum length is $constraint1`
  })
  @IsStrongPassword(undefined, {
    message: "Password must be at least 8 characters long and include one uppercase letter, one number, and one special character."
  })
  password: String
}