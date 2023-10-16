import { DatabaseModule } from "../database/database.module";
import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { userProviders } from "./user.providers";

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, ...userProviders]
})
export class UserModule {

}
