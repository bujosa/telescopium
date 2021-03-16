import {
  TicketCreatedEvent,
  Publisher,
  Subjects,
} from "@ticketing-bujosa/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
