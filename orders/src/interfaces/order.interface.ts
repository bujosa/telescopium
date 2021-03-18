import mongoose from "mongoose";

export interface Order {
  user: string;
  status: string;
  expiresAt: Date;
  ticket: TicketDoc;
}

export interface OrderDoc extends mongoose.Document {}
