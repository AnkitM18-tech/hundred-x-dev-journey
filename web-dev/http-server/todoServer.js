const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  const todos = require(__dirname + "/todos.json");
  return res.status(200).json({ todos });
});

app.post("/", (req, res) => {
  const { title } = req.body;
  const todos = require(__dirname + "/todos.json");
  todos.todos.push({ title, id: `todo-${new Date().getTime().toString()}` });
  const jsonTodos = JSON.stringify(todos);
  fs.writeFile("./todos.json", jsonTodos, "utf-8", (err) => {
    if (err)
      return res.status(500).json({ message: "Error in saving the todo." });
    else return res.status(201).json({ message: "Todo saved successfully." });
  });
});

app.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const todos = require(__dirname + "/todos.json");
  const updatedTodos = todos.todos.filter((todo) => todo.id !== id);
  updatedTodos.push({ title, id });
  todos.todos = updatedTodos;
  const jsonTodos = JSON.stringify(todos);
  fs.writeFile("./todos.json", jsonTodos, "utf-8", (err) => {
    if (err)
      return res.status(500).json({ message: "Error in updating the todo." });
    else return res.status(200).json({ message: "Todo updated successfully." });
  });
});

app.delete("/:id", (req, res) => {
  const { id } = req.params;
  const todos = require(__dirname + "/todos.json");
  const updatedTodos = todos.todos.filter((todo) => todo.id !== id);
  todos.todos = updatedTodos;
  const jsonTodos = JSON.stringify(todos);
  fs.writeFile("./todos.json", jsonTodos, "utf-8", (err) => {
    if (err)
      return res.status(500).json({ message: "Error in deleting the todo." });
    else return res.status(204).json({});
  });
});

app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});
