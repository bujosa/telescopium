import { Subjects } from "../enums/subjects";

export interface PaymentCreatedEvent {
  subject: Subjects.PaymentCreated;
  data: {
    id: string;
    order: string;
    stripe: string;
  };
}
