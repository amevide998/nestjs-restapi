import { Module } from '@nestjs/common';
import {AuthModule} from "./auth/auth.module";
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { FormCommunityModule } from "./form/form-community.module";

@Module({
  imports: [AuthModule, UserModule, BookmarkModule, FormCommunityModule],
})
export class AppModule {}
