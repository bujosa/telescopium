import { Message } from "node-nats-streaming";
import { Subjects } from "../enums/subjects";
import { Listener } from "../bases/base-listener";
import { ITicketCreatedEvent } from "../interfaces/ticket-created-event.interface";

export class TicketCreatedListener extends Listener<ITicketCreatedEvent> {
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = "paymentes-service";

  onMessage(data: ITicketCreatedEvent["data"], msg: Message): void {
    console.log("Event data! ", data);

    msg.ack();
  }
}
