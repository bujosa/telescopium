import { Message } from "node-nats-streaming";
import { Listener } from "../events/base-listener";

export class TicketCreatedListener extends Listener {
  subject = "ticket:created";
  queueGroupName = "paymentes-service";
  onMessage(data: any, msg: Message): void {
    console.log("Event data! ", data);

    msg.ack();
  }
}
