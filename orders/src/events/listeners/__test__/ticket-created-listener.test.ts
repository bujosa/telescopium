import { TicketCreatedEvent } from "@ticketing-bujosa/common";
import { natsWrapper } from "../../../nats-wrapper";
import { TicketCreatedListener } from "../ticket-created-listener";
import mongoose from "mongoose";

const setup = async () => {
  const listener = new TicketCreatedListener(natsWrapper.client);

  const data: TicketCreatedEvent["data"] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    price: 200,
    title: "test",
    user: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
  };
};

it("creates and saves a ticket", async () => {});

it("acks the message", async () => {});
