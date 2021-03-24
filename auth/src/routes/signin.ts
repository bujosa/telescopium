import express, { Response, Request } from "express";
import { body } from "express-validator";
import { BadRequestError, validateRequest } from "@ticketing-bujosa/common";
import { User } from "../models/user.entity";
import { Password } from "../services/user.service";
import { createSession } from "../utils/create-jwt-session";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password "),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new BadRequestError("Invalid credentials");
    }

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (passwordsMatch) {
      const userJwt = createSession(existingUser);
      req.session = {
        jwt: userJwt,
      };
      res.status(200).send(existingUser);
    }

    throw new BadRequestError("Invalid credentials");
  }
);

export { router as signinRouter };
