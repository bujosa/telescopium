import { Subjects } from "../enums/subjects";

export interface IEvent {
  subject: Subjects;
  data: any;
}
