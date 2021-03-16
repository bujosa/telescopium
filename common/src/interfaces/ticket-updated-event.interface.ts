import { Subjects } from "../enums/subjects";

export interface TicketUpdateEvent {
  subject: Subjects.TicketUpdated;
  data: {
    id: string;
    title: string;
    price: number;
    user: string;
  };
}
