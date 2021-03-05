import jwt from "jsonwebtoken";

export const createSession = (user: any) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    `${process.env.JWT}`
  );
};
