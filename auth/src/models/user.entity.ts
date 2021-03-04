import mongoose from "mongoose";
import { UserDoc, UserModel } from "../interfaces/user-model.interface";
import { IUser } from "../interfaces/user.interface";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.build = (user: IUser) => {
  return new User(user);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
