import {
  PaymentCreatedEvent,
  Publisher,
  Subjects,
} from "@ticketing-bujosa/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
