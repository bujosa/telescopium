import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import {
  currentUser,
  errorHandler,
  NotFoundError,
} from "@ticketing-bujosa/common";
import * as dotenv from "dotenv";
import { createTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";

dotenv.config();

const app = express();
app.set("trust proxy", true);
app.use(json());

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);
app.use(currentUser);

app.use(createTicketRouter);
app.use(showTicketRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
