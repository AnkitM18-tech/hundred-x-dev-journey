import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { Link } from "../db/models.js";
import type { Types } from "mongoose";

const router: Router = Router();

router.get("/:shareLink", async (req, res) => {
  const { shareLink } = req.params;
  try {
    const link = await Link.findOne({ hash: shareLink }).populate(
      "userId",
      "email"
    );
    if (!link) return res.status(404).json({ message: "Invalid Link" });
    return res.status(200).json({ message: "Link Fetched", data: link });
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
      const link = await Link.create({ hash: "", userId });
      return res.status(200).json({ message: "Link Generated", data: link });
    } else {
      return res.status(404).json({ message: "Sharing is disabled!" });
    }
  } catch (error) {
    throw new Error("Error in creating a sharable link", { cause: error });
  }
});

export default router;
