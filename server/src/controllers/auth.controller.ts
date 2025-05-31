import { Request, Response } from "express";
// import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { generateToken } from "../utils/generateToken";

// const generateToken = (id: string) => {
//   if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET not set");
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
// };

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({
        success: false,
        message: "User already exists",
      });
      return;
    }

    const user = await User.create({ name, email, password });

    if (user) {
      res.status(201).json({
        success: true,
        message: "Registration successful",
        data: {
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
          },
          token: generateToken(user._id.toString()),
        },
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid user data",
      });
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "An unknown error occurred",
      });
    }
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
          },
          token: generateToken(user._id.toString()),
        },
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "An unknown error occurred",
      });
    }
  }
};
