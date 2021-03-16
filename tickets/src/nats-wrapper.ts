import nats, { Stan } from "node-nats-streaming";

class NatsWraper {
  private _client?: Stan;

  connect(cluster: string, client: string, url: string): Promise<void> {
    this._client = nats.connect(cluster, client, { url });

    return new Promise((resolve, reject) => {
      this._client!.on("connect", () => {
        console.log("Connected to NATS");
        resolve();
      });

      this._client!.on("error", (err) => {
        reject(err);
      });
    });
  }
}

export const natsWraper = new NatsWraper();
