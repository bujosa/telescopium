import {
  Listener,
  OrderCreatedEvent,
  OrderStatus,
  Subjects,
} from "@ticketing-bujosa/common";
import { Message } from "node-nats-streaming";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName: string;
  onMessage(
    data: {
      id: string;
      version: number;
      status: OrderStatus;
      user: string;
      expiresAt: string;
      ticket: { id: string; price: number };
    },
    msg: Message
  ): void {
    throw new Error("Method not implemented.");
  }
}
