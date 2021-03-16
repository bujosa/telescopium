import { Stan } from "node-nats-streaming";
import { IEvent } from "../interfaces/event.interface";

export abstract class Publisher<T extends IEvent> {
  abstract subject: T["subject"];
  private client: Stan;

  constructor(client: Stan) {
    this.client = client;
  }
}
