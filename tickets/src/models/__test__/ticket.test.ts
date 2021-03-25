import { Ticket } from "../ticket";

it("implements optimistic concurrency control", async () => {
  const ticket = Ticket.build({
    title: "testing",
    price: 200,
    user: "123",
  });

  await ticket.save();
});
