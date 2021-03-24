import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { Ticket } from "../../models/ticket";
import { Order } from "../../models/order";
import { OrderStatus } from "@ticketing-bujosa/common";

it("resturns an error if the ticket does not exist", async () => {
  const ticket = mongoose.Types.ObjectId();
  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticket })
    .expect(404);
});

it("resturns an error if the ticket is already resolved", async () => {
  const ticket = Ticket.build({
    title: "concert",
    price: 20,
  });

  await ticket.save();

  const order = Order.build({
    ticket: ticket,
    user: "fjkrfrksfkf",
    status: OrderStatus.Created,
    expiresAt: new Date(),
  });

  const res = await order.save();
  console.log("order", res);

  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticket: ticket._id })
    .expect(400);
});

it("reserves a ticket", async () => {
  const ticket = Ticket.build({
    title: "concert",
    price: 20,
  });

  await ticket.save();
  console.log("hola ", ticket);
  const respon = await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticket: ticket._id })
    .expect(201);
});
