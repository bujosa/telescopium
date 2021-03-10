import express, { Request, Response } from "express";

const router = express.Router();

router.get("/api/tickets/:id", async (req: Request, res: Response) => {});

export { router as showTicketRouter };
