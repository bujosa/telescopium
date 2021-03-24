import {
  BadRequestError,
  NotFoundError,
  OrderStatus,
  requireAuth,
  validateRequest,
} from "@ticketing-bujosa/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import mongoose from "mongoose";
import { Order } from "../models/order";
import { Ticket } from "../models/ticket";

const router = express.Router();

const EXPIRATION_WINDOW_SECONDS = 15 * 60;

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
    const { ticket } = req.body;
    const ticketDB = await Ticket.findById(ticket);

    console.log("ticket");
    if (!ticketDB) {
      throw new NotFoundError();
    }

    const isReserved = await ticketDB.isReserved();

    if (isReserved) {
      throw new BadRequestError("Ticket is already reserved");
    }

    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    const order = Order.build({
      user: req.currentUser!.id,
      status: OrderStatus.Created,
      expiresAt: expiration,
      ticket: ticketDB,
    });

    await order.save();

    res.status(201).send(order);
  }
);

export { router as newOrderRouter };
