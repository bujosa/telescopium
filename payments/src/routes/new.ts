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
import { PaymentCreatedPublisher } from "../events/publishers/payment-created-publisher";
import { Order } from "../models/order";
import { Payment } from "../models/payment";
import { natsWrapper } from "../nats-wrapper";
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

    const charge = await stripe.charges.create({
      currency: "usd",
      amount: order_db.price * 100,
      source: token,
    });

    const payment = Payment.build({
      order,
      stripe: charge.id,
    });

    await payment.save();

    new PaymentCreatedPublisher(natsWrapper.client).publish({
      id: payment.id,
      order: payment.order,
      stripe: payment.stripe,
    });

    res.status(201).send({ success: true });
  }
);

export { router as createChargeRouter };
