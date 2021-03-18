import mongoose from "mongoose";

export interface Ticket {
  title: string;
  price: number;
}

export interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
}

export interface TicketModel extends mongoose.Model<TicketDoc> {
  build(ticket: Ticket): TicketDoc;
}
