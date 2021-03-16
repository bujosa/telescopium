import { Publisher } from "../bases/base-publisher";
import { Subjects } from "../enums/subjects";
import { ITicketCreatedEvent } from "../interfaces/ticket-created-event.interface";

export class TicketCreatedPublisher extends Publisher<ITicketCreatedEvent> {
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
