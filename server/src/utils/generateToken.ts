import jwt from "jsonwebtoken";

export const generateToken = (userId: string) => {
  const secret = process.env.JWT_SECRET as string;
  return jwt.sign({ id: userId }, secret, { expiresIn: "30d" });
};
