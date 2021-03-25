import { OrderStatus } from "../enums/order-status";
import { Subjects } from "../enums/subjects";

export interface OrderCreatedEvent {
  subject: Subjects.OrderCreated;
  data: {
    id: string;
    version: number;
    status: OrderStatus;
    user: string;
    expiresAt: string;
    ticket: {
      id: string;
      price: number;
    };
  };
}
