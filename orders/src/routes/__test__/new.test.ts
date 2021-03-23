import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("resturns an error if the ticket does not exist", async () => {
  const ticket = mongoose.Types.ObjectId();
  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticket })
    .expect(404);
});

it("resturns an error if the ticket is already resolved", async () => {});

it("reserves a ticket", async () => {});
