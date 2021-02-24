import express from "express";
import { Response, Request } from "express";
import { body } from "express-validator";

const router = express.Router();

router.post("/api/users/signup", (res: Response, req: Request) => {
  const { email, password } = req.body;
  if (!email || typeof email !== "string") {
    res.status(400).send("Provide a valid email");
  }
});

export { router as signupRouter };
