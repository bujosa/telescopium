import mongoose from "mongoose";

export interface Order {
  user: string;
  status: OrderStatus;
  expiresAt: Date;
  ticket: TicketDoc;
}

export interface OrderDoc extends mongoose.Document {}
