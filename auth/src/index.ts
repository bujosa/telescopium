import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connecting to database");
  } catch (error) {}

  app.listen(3000, () => {
    console.log(`Listening on port 3000`);
  });
};

start();
