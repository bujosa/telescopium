import {
  Publisher,
  Subjects,
  TicketUpdateEvent,
} from "@ticketing-bujosa/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdateEvent> {
  readonly subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
