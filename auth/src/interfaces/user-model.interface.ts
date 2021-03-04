import mongoose from "mongoose";
import { IUser } from "./user.interface";

export interface UserModel extends mongoose.Model<UserDoc> {
  build(user: IUser): UserDoc;
}

export interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}
