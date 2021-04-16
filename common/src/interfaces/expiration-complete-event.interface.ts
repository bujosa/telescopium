import { Subjects } from "../enums/subjects";

export interface ExpirationCompleteEvent {
  subject: Subjects.ExpirationComplete;
  data: {
    order: string;
  };
}
