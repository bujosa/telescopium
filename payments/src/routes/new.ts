import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  OrderStatus,
  requireAuth,
  validateRequest,
} from "@ticketing-bujosa/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Order } from "../models/order";
import { stripe } from "../stripe";

const router = express.Router();

router.post(
  "/api/payments",
  requireAuth,
  [body("token").not().isEmpty(), body("order").not().isEmpty()],
  validateRequest,
  async (req: Request, res: Response) => {
    const { token, order } = req.body;

    const order_db = await Order.findById(order);

    if (!order_db) {
      throw new NotFoundError();
    }

    if (order_db.user !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    if (order_db.status === OrderStatus.Cancelled) {
      throw new BadRequestError("Cannot pay for an cancelled order");
    }

    await stripe.charges.create({
      currency: "usd",
      amount: order.price * 100,
      source: token,
    });

    res.send({ success: true });
  }
);

export { router as createChargeRouter };
