const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());
const users = [];
const JWT_SECRET = "100xdevs-cohort3-super-secret-token";

/*
const generateToken = () => {
  let options = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  let token = "";
  for (let i = 0; i < 32; i++) {
    token += options[Math.floor(Math.random() * options.length)];
  }
  return token;
};
*/

const loggerMiddleware = (req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
};

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token)
    return res.status(401).json({ message: "Invalid or Missing Token" });

  const decoded = jwt.verify(token, JWT_SECRET);
  if (decoded.username) {
    req.user = decoded.username;
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

// localhost:3000 -> handles CORS
app.get("/", (req, res) => {
  return res.sendFile(__dirname + "/public/index.html");
});

app.post("/signup", loggerMiddleware, (req, res) => {
  const { username, password } = req.body;
  if (users.find((user) => user.username === username))
    return res.status(400).json({ message: "You have already signed up." });
  else users.push({ username, password, todos: [] });
  return res.status(201).json({ message: "You have signed up." });
});

app.post("/signin", loggerMiddleware, (req, res) => {
  const { username, password } = req.body;
  let user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (!user) {
    return res.status(401).json({ message: "Invalid Username or Password" });
  } else {
    const token = jwt.sign({ username }, JWT_SECRET);
    return res.status(200).json({ token: token });
  }
});

app.get("/me", loggerMiddleware, authMiddleware, (req, res) => {
  let user = users.find((user) => user.username === req.user);
  return res.status(200).json({ user });
});

app.get("/todos", loggerMiddleware, authMiddleware, (req, res) => {
  let user = users.find((user) => user.username === req.user);
  return res.status(200).json({ todos: user.todos });
});

app.post("/todos", loggerMiddleware, authMiddleware, (req, res) => {
  let user = users.find((user) => user.username === req.user);
  const { title } = req.body;
  user["todos"].push({ title, id: `todo-${new Date().getTime().toString()}` });
  return res.status(201).json({ message: "Todo added!" });
});

app.patch("/todos/:id", loggerMiddleware, authMiddleware, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  let user = users.find((user) => user.username === req.user);
  const updatedTodos = user.todos.filter((todo) => todo.id !== id);
  const todo = user.todos.find((todo) => todo.id === id);
  todo.title = title;
  updatedTodos.push(todo);
  user.todos = updatedTodos;
  return res.status(200).json({ message: "Todo updated!" });
});

app.delete("/todos/:id", loggerMiddleware, authMiddleware, (req, res) => {
  const { id } = req.params;
  let user = users.find((user) => user.username === req.user);
  const updatedTodos = user.todos.filter((todo) => todo.id !== id);
  user.todos = updatedTodos;
  return res.status(200).json({ message: "Todo deleted!" });
});

app.listen(3000, () => console.log("Server is running on Port 3000"));
