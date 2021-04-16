import { OrderStatus } from "@ticketing-bujosa/common";
import mongoose from "mongoose";

export interface Order {
  id: string;
  version: number;
  user: string;
  price: number;
  status: OrderStatus;
}

export interface OrderDoc extends mongoose.Document {
  version: number;
  user: string;
  price: number;
  status: OrderStatus;
}

export interface OrderModel extends mongoose.Model<OrderDoc> {
  build(order: Order): OrderDoc;
}
