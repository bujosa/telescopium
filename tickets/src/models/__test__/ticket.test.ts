import { Ticket } from "../ticket";

it("implements optimistic concurrency control", async (done) => {
  const ticket = Ticket.build({
    title: "testing",
    price: 200,
    user: "123",
  });

  await ticket.save();

  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  firstInstance?.set({ price: 10 });
  secondInstance?.set({ price: 15 });

  await firstInstance!.save();

  try {
    await secondInstance!.save();
  } catch (err) {
    return done();
  }

  throw new Error("Should not reach this point");
});

it("inscrements the version number on multiple saves", async () => {
  const ticket = Ticket.build({
    title: "testing",
    price: 200,
    user: "123",
  });

  await ticket.save();
  expect(ticket.version).toEqual(0);

  await ticket.save();
  expect(ticket.version).toEqual(1);

  await ticket.save();
  expect(ticket.version).toEqual(2);

  await ticket.save();
  expect(ticket.version).toEqual(3);
});
