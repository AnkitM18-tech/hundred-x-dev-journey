import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { z } from "zod";
import { Content } from "../db/models.js";
import type { Types } from "mongoose";

const router: Router = Router();

router.use(authMiddleware);

router.get("/", async (req, res) => {
  const userId = req.userId as Types.ObjectId;
  try {
    const contents = await Content.find({ userId });

    return res
      .status(200)
      .json({ message: "Contents Fetched", data: contents });
  } catch (error) {
    throw new Error("Error in fetching the content!", { cause: error });
  }
});

router.post("/", async (req, res) => {
  const contentSchema = z.object({
    link: z.url(),
    type: z.string(),
    title: z.string(),
  });

  const parseData = contentSchema.safeParse(req.body);

  if (!parseData.success)
    return res
      .status(400)
      .json({ message: "Bad Input Format", errors: parseData.error });

  const { link, type, title } = parseData.data;
  try {
    await Content.create({
      link,
      type,
      title,
      tags: [],
      userId: req.userId as Types.ObjectId,
    });

    return res.status(201).json({ message: "Content Created" });
  } catch (error) {
    throw new Error("Error creating content", { cause: error });
  }
});

router.patch("/:id", async (req, res) => {
  const contentSchema = z.object({
    link: z.url(),
    type: z.string(),
    title: z.string(),
  });

  const parseData = contentSchema.safeParse(req.body);

  if (!parseData.success)
    return res
      .status(400)
      .json({ message: "Bad Input Format", errors: parseData.error });

  const { id } = req.params;
  const userId = req.userId as Types.ObjectId;

  const { title, link, type } = parseData.data;
  try {
    const content = await Content.findById({ _id: id });
    if (!content) return res.status(404).json({ message: "Content not found" });

    if (!content.userId.equals(userId))
      return res.status(403).json({ message: "Unauthorized" });

    content.title = title || content.title;
    content.link = link || content.link;
    content.type = type || content.type;

    await content.save();

    return res.status(200).json({ message: "Content updated" });
  } catch (error) {
    throw new Error("Error updating content", { cause: error });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const userId = req.userId as Types.ObjectId;

  try {
    const content = await Content.findById({ _id: id });

    if (!content) return res.status(404).json({ message: "Content not found" });

    if (!content.userId.equals(userId))
      return res.status(403).json({ message: "Unauthorized" });

    await content.deleteOne();

    return res.status(200).json({ message: "Content deleted" });
  } catch (error) {
    throw new Error("Error deleting content", { cause: error });
  }
});

export default router;
