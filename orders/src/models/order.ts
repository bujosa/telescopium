import mongoose from "mongoose";
import { Order, OrderDoc } from "../interfaces/order.interface";

export interface OrderModel extends mongoose.Model<OrderDoc> {
  build(order: Order): OrderDoc;
}

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: mongoose.Schema.Types.Date,
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
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

orderSchema.statics.build = (order: Order) => {
  return new Order(order);
};

const Order = mongoose.model<OrderDoc, OrderModel>("Order", orderSchema);

export { Order };
