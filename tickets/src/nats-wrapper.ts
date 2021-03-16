import nats, { Stan } from "node-nats-streaming";

class NatsWraper {
  private _client?: Stan;
  connect(cluster: string, client: string, url: string) {
    this._client = nats.connect(cluster, client, { url });
  }
}

export const natsWraper = new NatsWraper();
