import nats, { Message } from "node-nats-streaming";
import { randomBytes } from "crypto";
import { TicketCreatedListener } from "./classes/ticker-created-listener.class";

const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connected to NATS");

  stan.on("close", () => {
    console.log("Nats Connection closed");
    process.exit();
  });

  new TicketCreatedListener(stan);
});

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
