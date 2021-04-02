import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import {
  ITicket,
  TicketDoc,
  ITicketModel,
} from "../interfaces/ticket.interface";

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    order: {
      type: String,
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

ticketSchema.set("versionKey", "version");

ticketSchema.plugin(updateIfCurrentPlugin);

ticketSchema.statics.build = (ticket: ITicket) => {
  return new Ticket(ticket);
};

const Ticket = mongoose.model<TicketDoc, ITicketModel>("Ticket", ticketSchema);

export { Ticket };
