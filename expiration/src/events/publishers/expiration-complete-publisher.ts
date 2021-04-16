import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from "@ticketing-bujosa/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
