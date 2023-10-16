import * as mongoose from "mongoose";

export const CommunityFormSchema = new mongoose.Schema({
  communityName: String,
  communityField: String,
  communityContact: String,
  email: String,
  instagram : String,
  createdAt: Date
})