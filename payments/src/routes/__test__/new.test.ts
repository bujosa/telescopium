import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { Order } from "../../models/order";
import { OrderStatus } from "@ticketing-bujosa/common";

it("returns a 404 when purchasing an order that does not exist", async () => {
  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin())
    .send({ token: "test", order: mongoose.Types.ObjectId().toHexString() })
    .expect(404);
});

it("returns a 401 when purchasing an order that doesnt belong to the user", async () => {
  const order = Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    user: mongoose.Types.ObjectId().toHexString(),
    version: 0,
    price: 30,
    status: OrderStatus.Created,
  });

  await order.save();

  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin())
    .send({ token: "test", order: order.id })
    .expect(401);
});

it("returns a 400 when purchasing a cancelled order", async () => {});
