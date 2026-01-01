import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { JWTPayload } from "../../@types/jsonwebtoken/index.js";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization as string;
  const decodedToken = jwt.verify(
    token,
    process.env.JWT_SECRET as string
  ) as JWTPayload;

  if (!decodedToken)
    return res.status(403).json({ message: "Not authenticated!" });

  req.userId = decodedToken.id;
  next();
};
