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
import { deleteOrderRouter } from "./routes/delete";
import { indexOrderRouter } from "./routes";
import { newOrderRouter } from "./routes/new";
import { showOrderRouter } from "./routes/show";

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

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(deleteOrderRouter);
app.use(indexOrderRouter);
app.use(newOrderRouter);
app.use(showOrderRouter);

app.use(errorHandler);

export { app };
