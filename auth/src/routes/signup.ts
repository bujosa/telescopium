import express from "express";
import { Response, Request } from "express";

const router = express.Router();

router.post("/api/users/signup", (res: Response, req: Request) => {
  const { email, password } = req.body;
  res.send("Hi there");
});

export { router as signupRouter };
