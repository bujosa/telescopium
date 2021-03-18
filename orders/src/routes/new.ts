import {
  BadRequestError,
  NotFoundError,
  requireAuth,
  validateRequest,
} from "@ticketing-bujosa/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import mongoose from "mongoose";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.post(
  "/api/orders",
  requireAuth,
  [
    body("ticket")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("TicketId must be provided"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.body.ticket);

    if (!ticket) {
      throw new NotFoundError();
    }

    const isReserved = await ticket.isReserved();

    if (isReserved) {
      throw new BadRequestError("Ticket is already reserved");
    }

    res.send({});
  }
);

export { router as newOrderRouter };
