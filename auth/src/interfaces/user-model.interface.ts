import mongoose from "mongoose";
import { IUser } from "./user.interface";

export interface UserModel extends mongoose.Model<any> {
  build(user: IUser): any;
}
