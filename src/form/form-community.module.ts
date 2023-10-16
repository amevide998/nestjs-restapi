import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { formCommunityProviders } from "./form-community.providers";
import { FormCommunityService } from "./form-community.service";
import { FormCommunityController } from "./form-community.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [FormCommunityController],
  providers: [FormCommunityService, ...formCommunityProviders]
})
export class FormCommunityModule {

}
