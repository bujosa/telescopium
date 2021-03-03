import mongoose from "mongoose";
import { UserModel } from "../interfaces/user-model.interface";
import { IUser } from "../interfaces/user.interface";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.build = (user: IUser) => {
  return new User(user);
};

const User = mongoose.model<any, UserModel>("User", userSchema);

export { User };
