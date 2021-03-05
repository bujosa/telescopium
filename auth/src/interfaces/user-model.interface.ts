import mongoose from "mongoose";
import { IUser } from "./user.interface";

export interface IUserModel extends mongoose.Model<IUserDoc> {
  build(user: IUser): IUserDoc;
}

export interface IUserDoc extends mongoose.Document {
  email: string;
  password: string;
}
