import request from "supertest";
import { app } from "../../app";

const createTicket = () => {
  return request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "test", price: 20 });
};

it("Can fetch a list of tickets", async () => {
  await createTicket();
  await createTicket();
  await createTicket();
});
