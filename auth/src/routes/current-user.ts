import express from "express";
import { Response } from "express";

const router = express.Router();

router.get("/api/users/currentuser", (res: Response) => {
  res.send("Hi there");
});

export { router as currentUserRouter };
