import { Stan } from "node-nats-streaming";
import { Console } from "node:console";
import { IEvent } from "../interfaces/event.interface";

export abstract class Publisher<T extends IEvent> {
  abstract subject: T["subject"];
  private client: Stan;

  constructor(client: Stan) {
    this.client = client;
  }

  publish(data: T["data"]) {
    this.client.publish(this.subject, data, () => {
      console.log("Event published");
    });
  }
}
