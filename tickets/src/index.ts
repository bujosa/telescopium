import mongoose from "mongoose";
import { app } from "./app";
import { natsWraper } from "./nats-wrapper";
import { randomBytes } from "crypto";

const start = async () => {
  try {
    await natsWraper.connect(
      process.env.NAST_CLUSTER_ID!,
      randomBytes(4).toString("hex"),
      process.env.NAST_URL!
    );
    natsWraper.client.on("close", () => {
      console.log("Nats Connection closed");
      process.exit();
    });

    process.on("SIGINT", () => natsWraper.client.close());
    process.on("SIGTERM", () => natsWraper.client.close());

    await mongoose.connect(process.env.MONGO_URL!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (error) {}

  app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
  });
};

start();
