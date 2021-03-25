import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from "@ticketing-bujosa/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
