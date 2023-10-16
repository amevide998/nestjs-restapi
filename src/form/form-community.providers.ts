import { Connection } from "mongoose";
import { CommunityFormSchema } from "../schema/form-commnity.schema";

export const  formCommunityProviders = [
  {
    provide: 'COMMUNITY_FORM_MODEL',
    useFactory: (connection: Connection) => connection.model('CommunityForm', CommunityFormSchema),
    inject: ['DATABASE_CONNECTION']
  }
]