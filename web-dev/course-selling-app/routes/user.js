const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const { User, Course, Purchase } = require("../db/schema");
const { userMiddleware } = require("../middlewares/auth");

router.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists)
    return res.status(400).json({ message: "User already exists!" });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    return res.status(201).json({ message: "User Created!" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong!" });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (!userExists) {
    return res.status(404).json({ message: "User doesn't exist!" });
  }
  const doesPasswordMatch = await bcrypt.compare(password, userExists.password);

  if (!doesPasswordMatch) {
    return res.status(400).json({ message: "Incorrect Credentials!" });
  } else {
    const token = jwt.sign({ id: userExists._id }, process.env.JWT_SECRET);
    return res.status(200).json({ token });
  }
});

router.use(userMiddleware);
router.get("/purchases", async (req, res) => {
  const userId = req.userId;
  try {
    const purchases = await Purchase.find({ userId });
    const coursesData = await Course.find({
      _id: { $in: purchases.map((x) => x.courseId) },
    });
    return res.status(200).json({ purchases, coursesData });
  } catch (error) {
    return res.status(500).json({ message: "Something went Wrong!" });
  }
});

module.exports = router;
