import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { Content, Link } from "../db/models.js";
import type { Types } from "mongoose";
import { randomLinkGenerator } from "../utils.js";

const router: Router = Router();

router.get("/:shareLink", async (req, res) => {
  const { shareLink } = req.params;
  try {
    const link = await Link.findOne({ hash: shareLink }).populate(
      "userId",
      "-password"
    );
    if (!link) return res.status(404).json({ message: "Invalid Link" });

    const content = await Content.find({ userId: link.userId._id });
    return res.status(200).json({
      message: "Contents Fetched",
      data: {
        content,
        user: (link.userId as any).email,
      },
    });
  } catch (error) {
    throw new Error("Error in fetching the content!", { cause: error });
  }
});

router.use(authMiddleware);
router.post("/share", async (req, res) => {
  const { share } = req.body;
  const userId = req.userId as Types.ObjectId;
  try {
    if (share) {
      const existingLink = await Link.findOne({ userId });
      if (existingLink)
        return res
          .status(200)
          .json({ message: "Link already exists", data: existingLink });
      else {
        const hash = randomLinkGenerator(10);
        const link = await Link.create({ hash, userId });
        return res.status(200).json({ message: "Link Generated", data: link });
      }
    } else {
      await Link.deleteOne({ userId });
      return res.status(200).json({ message: "Sharing is disabled!" });
    }
  } catch (error) {
    throw new Error("Error in creating a sharable link", { cause: error });
  }
});

export default router;
