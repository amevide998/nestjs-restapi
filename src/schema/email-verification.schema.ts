import * as mongoose from "mongoose";

export const EmailVerificationSchema = new mongoose.Schema({
  userId: String,
  hash: String,
  createdAt: Date,
  expiresAt: Date
})