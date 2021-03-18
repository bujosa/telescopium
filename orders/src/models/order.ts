import { OrderStatus } from "@ticketing-bujosa/common";
import mongoose from "mongoose";
import { Order, OrderDoc, OrderModel } from "../interfaces/order.interface";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(OrderStatus),
      default: OrderStatus.Created,
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
