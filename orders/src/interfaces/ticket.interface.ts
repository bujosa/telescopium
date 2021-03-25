import mongoose from "mongoose";

export interface Ticket {
  id: string;
  title: string;
  price: number;
}

export interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  isReserved(): Promise<boolean>;
}

export interface TicketModel extends mongoose.Model<TicketDoc> {
  build(ticket: Ticket): TicketDoc;
}
