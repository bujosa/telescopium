import { OrderStatus } from "@ticketing-bujosa/common";
import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { Order, OrderDoc, OrderModel } from "../interfaces/order.interface";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: OrderStatus,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

orderSchema.set("versionKey", "version");
orderSchema.plugin(updateIfCurrentPlugin);

orderSchema.statics.build = (order: Order) => {
  return new Order({
    _id: order.id,
    version: order.version,
    price: order.price,
    user: order.user,
    status: order.status,
  });
};

const Order = mongoose.model<OrderDoc, OrderModel>("Order", orderSchema);

export { Order };
