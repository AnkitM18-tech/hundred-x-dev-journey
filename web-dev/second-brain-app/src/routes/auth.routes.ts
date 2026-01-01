import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { User } from "../db/models.js";

const router: Router = Router();

router.post("/signup", async (req, res) => {
  const signupSchema = z.object({
    email: z.email(),
    password: z
      .string()
      .min(8, "Password must be atleast 8 characters long")
      .max(20, "Password must not exceed 20 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      ),
  });

  const parseData = signupSchema.safeParse(req.body);

  if (!parseData.success)
    return res
      .status(400)
      .json({ message: "Bad Input Format", errors: parseData.error });

  const { email, password } = parseData.data;

  try {
    const user = await User.findOne({ email });
    if (user) return res.status(403).json({ message: "User already exists!" });
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashedPassword });

    return res.status(201).json({ message: "User Created!" });
  } catch (error) {
    throw new Error("Error in Signing up the User!", { cause: error });
  }
});

router.post("/signin", async (req, res) => {
  const signInSchema = z.object({
    email: z.email(),
    password: z.string(),
  });

  const parseData = signInSchema.safeParse(req.body);

  if (!parseData.success)
    return res
      .status(400)
      .json({ message: "Bad Input Format", errors: parseData.error });

  const { email, password } = parseData.data;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "No existing user!" });

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.status(403).json({ message: "No such user!" });
    }

    const token = jwt.sign(
      {
        id: existingUser._id,
      },
      process.env.JWT_SECRET as string
    );

    return res.status(200).json({ message: "User signed in!", token });
  } catch (error) {
    throw new Error("Error signing in the user!", { cause: error });
  }
});

export default router;
