import {
  OrderCancelledEvent,
  Publisher,
  Subjects,
} from "@ticketing-bujosa/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
