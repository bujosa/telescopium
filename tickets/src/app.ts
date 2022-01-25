import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import {
  currentUser,
  errorHandler,
  NotFoundError,
} from "@ticketing-bujosa/common";
import { createTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";
import { getAllTicketsRouter } from "./routes/tickets";
import { updateTicketRouter } from "./routes/update";

const app = express();
app.set("trust proxy", true);
app.use(json());

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

// Get Current User
app.use(currentUser);

// Create Ticket
app.use(createTicketRouter);

// Shot Ticket
app.use(showTicketRouter);

// Show tickets
app.use(getAllTicketsRouter);

// Update ticket
app.use(updateTicketRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
