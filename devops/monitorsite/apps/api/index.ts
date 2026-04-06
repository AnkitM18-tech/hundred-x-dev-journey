import express from "express";
import { prisma } from "@repo/db";

const app = express();

app.use(express.json());

app.post("/website", async (req, res) => {
  const website = await prisma.website.create({
    data: {
      url: req.body.url,
      time_added: new Date(),
    },
  });

  return res.status(201).json({ id: website.id });
});

app.get("/status/:websiteId", (req, res) => {});

app.listen(process.env.PORT || 3000, () => console.log("Backend is Up!"));
