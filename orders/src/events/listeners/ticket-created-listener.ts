import {
  Listener,
  Subjects,
  TicketCreatedEvent,
} from "@ticketing-bujosa/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = queueGroupName;

  onMessage(data: TicketCreatedEvent["data"], msg: Message) {}
}
