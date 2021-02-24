import express, { Response, Request } from "express";

const router = express.Router();

router.post("/api/users/signout", (req: Request, res: Response) => {
  res.send("Hi there");
});

export { router as signoutRouter };
