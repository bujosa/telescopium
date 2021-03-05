import mongoose from "mongoose";
import { UserDoc, UserModel } from "../interfaces/user-model.interface";
import { IUser } from "../interfaces/user.interface";
import { Password } from "../services/user.service";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

userSchema.statics.build = (user: IUser) => {
  return new User(user);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
