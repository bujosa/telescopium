import mongoose from "mongoose";
import { app } from "./app";
import { natsWraper } from "./nats-wrapper";

const start = async () => {
  try {
    await natsWraper.connect("ticketing", "dfrfrf", "http://nats-service:4222");
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
