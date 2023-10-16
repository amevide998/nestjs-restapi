import { Connection } from "mongoose";
import { UserSchema } from "../schema/user.schema";

export const  authProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) => connection.model('User', UserSchema),
    inject: ['DATABASE_CONNECTION']
  }
]