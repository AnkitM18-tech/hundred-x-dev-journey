const express = require("express");

const router = express.Router();

const { Course, Purchase } = require("../db/schema");
const { userMiddleware } = require("../middlewares/auth");

router.get("/", async (req, res) => {
  const courses = await Course.find({});
  return res.status(200).json({ courses });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ message: "Course not found!" });
    return res.status(200).json({ course });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong!" });
  }
});

router.post("/purchase/:id", userMiddleware, async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const alreadyBought = await Purchase.findOne({ courseId: id, userId });
    if (alreadyBought)
      return res.status(400).json({ message: "Course already bought!" });
    //TODO: Payment check - Integration
    const purchase = await Purchase.create({
      courseId: id,
      userId,
    });
    return res
      .status(201)
      .json({ message: "Course Purchased!", purchaseId: purchase._id });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong!" });
  }
});

module.exports = router;
