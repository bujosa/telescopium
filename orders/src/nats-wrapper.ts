import nats, { Stan } from "node-nats-streaming";

class NatsWraper {
  private _client?: Stan;

  get client() {
    if (!this._client) {
      throw new Error("Cannot access NATS client before connecting");
    }

    return this._client;
  }

  connect(cluster: string, client: string, url: string): Promise<void> {
    this._client = nats.connect(cluster, client, { url });

    return new Promise((resolve, reject) => {
      this.client.on("connect", () => {
        console.log("Connected to NATS");
        resolve();
      });

      this.client.on("error", (err) => {
        reject(err);
      });
    });
  }
}

export const natsWraper = new NatsWraper();
