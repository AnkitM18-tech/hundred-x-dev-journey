const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const { Admin, Course } = require("../db/schema");
const { adminMiddleware } = require("../middlewares/auth");

router.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  const adminExists = await Admin.findOne({ email });

  if (adminExists)
    return res.status(400).json({ message: "Admin already exists!" });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await Admin.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    return res.status(201).json({ message: "Admin Created!" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong!" });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const adminExists = await Admin.findOne({ email });
  if (!adminExists) {
    return res.status(404).json({ message: "Admin doesn't exist!" });
  }
  const doesPasswordMatch = await bcrypt.compare(
    password,
    adminExists.password
  );

  if (!doesPasswordMatch) {
    return res.status(400).json({ message: "Incorrect Credentials!" });
  } else {
    const token = jwt.sign(
      { id: adminExists._id },
      process.env.JWT_SECRET_ADMIN
    );
    return res.status(200).json({ token });
  }
});

router.use(adminMiddleware);

router.get("/courses", async (req, res) => {
  const adminId = req.userId;
  try {
    const courses = await Course.find({ adminId });
    return res.status(200).json({ courses });
  } catch (error) {
    return res.status(500).json({ message: "Something went Wrong!" });
  }
});

router.post("/courses", async (req, res) => {
  const adminId = req.userId;
  const { title, description, price, imageUrl } = req.body;
  try {
    const course = await Course.create({
      title,
      description,
      price,
      imageUrl,
      adminId,
    });
    return res
      .status(201)
      .json({ message: "Course Created!", courseId: course._id });
  } catch (error) {
    return res.status(500).json({ message: "Something went Wrong!" });
  }
});

router.patch("/courses/:id", async (req, res) => {
  const adminId = req.userId;
  const { id } = req.params;
  const course = await Course.findById(id);
  if (!course) return res.status(404).json({ message: "Course not found!" });
  if (!course.adminId.equals(adminId))
    return res.status(403).json({ message: "Unauthorized" });
  const { title, description, price, imageUrl } = req.body;
  try {
    const updatedCourse = await Course.findByIdAndUpdate(id, {
      title: title || course.title,
      description: description || course.description,
      price: price || course.price,
      imageUrl: imageUrl || course.imageUrl,
    });
    return res
      .status(200)
      .json({ message: "Course updated!", courseId: updatedCourse._id });
  } catch (error) {
    return res.status(500).json({ message: "Something went Wrong!" });
  }
});

router.delete("/courses/:id", async (req, res) => {
  const adminId = req.userId;
  const { id } = req.params;
  const course = await Course.findById(id);
  if (!course) return res.status(404).json({ message: "Course not found!" });

  if (!course.adminId.equals(adminId))
    return res.status(403).json({ message: "Unauthorized" });
  try {
    await Course.findByIdAndDelete(id);
    return res.status(204).json({ message: "Course Deleted!" });
  } catch (error) {
    return res.status(500).json({ message: "Something went Wrong!" });
  }
});

module.exports = router;
