require("dotenv").config();
const express = require("express");
const { User, Todo } = require("./db");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { z } = require("zod");

const { jwt, authMiddleware } = require("./auth");

mongoose.connect(process.env.MONGODB_URI);
const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/signup", async (req, res) => {
  const signUpBody = z.object({
    email: z.email(),
    name: z.string().min(3).max(50),
    password: z.string().min(5).max(30),
  });

  const parseData = signUpBody.safeParse(req.body);

  if (!parseData.success)
    return res
      .status(400)
      .json({ message: "Bad Input Format", errors: parseData.error });

  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({ message: "You are signed up!" });
  } catch (error) {
    return res.status(400).json({ message: "User already exists!" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    email,
  });

  if (!user) return res.status(404).json({ message: "No User Found" });

  const isPasswordMatching = await bcrypt.compare(password, user.password);

  if (isPasswordMatching) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return res.status(200).json({ token });
  } else {
    return res.status(401).json({ message: "Incorrect Credentials" });
  }
});

app.get("/todos", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const todos = await Todo.find({ userId });

  return res.status(200).json({ message: "Todos fetched!", todos });
});

app.post("/todos", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const { title } = req.body;

  await Todo.create({ title, done: false, userId });

  return res.status(201).json({ message: "Todo created!" });
});

app.patch("/todos/:id", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const { id } = req.params;
  const { title, done } = req.body;

  const todo = await Todo.findById(id);
  if (!todo) return res.status(404).json({ message: "Todo not found!" });

  if (!todo.userId.equals(userId))
    return res
      .status(403)
      .json({ message: "Not authorized to perform this action" });

  todo.title = title || todo.title;
  todo.done = done || todo.done;

  try {
    await todo.save();
    return res.status(200).json({ message: "Todo updated!" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong!" });
  }
});

app.delete("/todos/:id", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const { id } = req.params;

  const todo = await Todo.findById(id);
  if (!todo) return res.status(404).json({ message: "Todo not found!" });

  if (!todo.userId.equals(userId))
    return res
      .status(403)
      .json({ message: "Not authorized to perform this action" });

  try {
    await Todo.findByIdAndDelete(id);
    return res.status(200).json({ message: "Todo deleted!" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong!" });
  }
});

app.listen(PORT, () => console.log(`Server is listening on Port ${PORT}`));
