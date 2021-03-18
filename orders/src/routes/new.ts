import { requireAuth, validateRequest } from "@ticketing-bujosa/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/api/orders",
  requireAuth,
  [body("ticketId").not().isEmpty().withMessage("TicketId must be provided")],
  validateRequest,
  async (req: Request, res: Response) => {
    res.send({});
  }
);

export { router as newOrderRouter };
