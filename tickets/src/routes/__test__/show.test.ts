import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";

it("Returns a 404 if the ticket is not found", async () => {
  await request(app).get("/api/tickets/fsfrgfrgrsg").send().expect(404);
});

it("Returns a 404 if the ticket is not found", async () => {
  await request(app).get("/api/tickets/fsfrgfrgrsg").send().expect(404);
});
