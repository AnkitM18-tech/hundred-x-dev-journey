const express = require("express");

const app = express();
app.use(express.json());

let todos = [];

// create a todo
app.post("/", (req, res) => {
  const { title } = req.body;
  const newTodo = { id: `todo-${new Date().getTime().toString()}`, title };
  todos.push(newTodo);
  return res.status(201).json({ todo: newTodo });
});

// get all todos
app.get("/", (req, res) => {
  return res.status(200).json({ todos });
});

// get todo by id
app.get("/:id", (req, res) => {
  const { id } = req.params;
  const todo = todos.filter((todo) => todo.id === id);
  return res.status(200).json({ todo });
});

// delete a todo
app.delete("/:id", (req, res) => {
  const { id } = req.params;
  todos = todos.filter((todo) => todo.id !== id);
  return res.status(204).json({});
});

// update a todo
app.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  todos = todos.filter((todo) => todo.id !== id);
  todos.push({ id, title });
  return res.status(200).json({ todos });
});

app.listen(3000, () => console.log(`The server is listening on port 3000`));
