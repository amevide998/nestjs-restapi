import * as mongoose from "mongoose";

export const BookmarkSchema = new mongoose.Schema({
  title: String,
  description: String,
  link: String,
  createdAt: Date,
  updatedAt: Date
})