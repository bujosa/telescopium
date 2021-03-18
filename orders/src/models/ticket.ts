import { OrderStatus } from "@ticketing-bujosa/common";
import mongoose from "mongoose";
import { Ticket, TicketDoc, TicketModel } from "../interfaces/ticket.interface";
import { Order } from "./order";

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
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

ticketSchema.statics.build = (ticket: Ticket) => {
  return new Ticket(ticket);
};

ticketSchema.methods.isReserved = async function () {
  const existingOrder = await Order.findOne({
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.AwaitingPayment,
        OrderStatus.Complete,
      ],
    },
    ticket: this,
  });

  return !!existingOrder;
};

const Ticket = mongoose.model<TicketDoc, TicketModel>("Ticket", ticketSchema);

export { Ticket };
