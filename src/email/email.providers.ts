import { Connection } from "mongoose";
import { EmailVerificationSchema } from "../schema/email-verification.schema";

export const  emailVerificationProviders = [
  {
    provide: 'VERIFICATION_MODEL',
    useFactory: (connection: Connection) => connection.model('EmailVerification', EmailVerificationSchema),
    inject: ['DATABASE_CONNECTION']
  }
]