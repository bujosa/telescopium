import { OrderStatus } from "@ticketing-bujosa/common";
import mongoose from "mongoose";
import { TicketDoc } from "./ticket.interface";

export interface Order {
  user: string;
  status: OrderStatus;
  expiresAt: Date;
  ticket: TicketDoc;
}

export interface OrderDoc extends mongoose.Document {
  user: string;
  status: OrderStatus;
  expiresAt: Date;
  ticket: TicketDoc;
}

export interface OrderModel extends mongoose.Model<OrderDoc> {
  build(order: Order): OrderDoc;
}
