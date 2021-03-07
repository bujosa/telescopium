import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IUserPayload } from "../../../auth/src/interfaces/user-payload.interface";

declare global {
  namespace Express {
    interface Request {
      currentUser?: IUserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT!
    ) as IUserPayload;

    req.currentUser = payload;
  } catch (err) {}

  next();
};
