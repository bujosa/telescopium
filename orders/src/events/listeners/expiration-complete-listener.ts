import {
  ExpirationCompleteEvent,
  Listener,
  Subjects,
} from "@ticketing-bujosa/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";

export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {
  queueGroupName = queueGroupName;

  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;

  async onMessage(data: ExpirationCompleteEvent["data"], msg: Message) {}
}
