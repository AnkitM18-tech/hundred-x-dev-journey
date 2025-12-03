const fs = require("fs");
const { Command } = require("commander");

const program = new Command();

program
  .name("todo-cli")
  .description("todo application in cli")
  .version("1.0.0");

program
  .command("add-todo")
  .description("Add Todo to the file")
  .option("-t, --todo <todo>", "Todo Description")
  .option("-p, --path <path>", "Path to File")
  .action((options) => {
    const data = require("./" + options.path);
    data.todos.push({ title: options.todo, id: data.total + 1 });
    data.total += 1;
    const jsonStringified = JSON.stringify(data);
    fs.writeFile("todo.json", jsonStringified, (err) => {
      if (err) console.log(err);
      else console.log("Todo added");
    });
  });

program
  .command("update-todo")
  .description("Update a Todo from the file")
  .option("-i, --id <id>", "Todo ID to update")
  .option("-t, --todo <todo>", "Todo Description")
  .option("-p, --path <path>", "Path to File")
  .action((options) => {
    const data = require("./" + options.path);
    const id = parseInt(options.id);
    const todos = data.todos.filter((todo) => todo.id !== id);
    todos.push({ title: options.todo, id: id });
    data.todos = todos;
    const jsonStringified = JSON.stringify(data);
    fs.writeFile("./" + options.path, jsonStringified, (err) => {
      if (err) console.log(err);
      else console.log("Todo Updated");
    });
  });

program
  .command("delete-todo")
  .description("Delete a Todo from the file")
  .option("-i, --id <id>", "Todo ID to delete")
  .option("-p, --path <path>", "Path to File")
  .action((options) => {
    const data = require("./" + options.path);
    const id = parseInt(options.id);
    const todos = data.todos.filter((todo) => todo.id !== id);
    const deletedTodo = data.todos.filter((todo) => todo.id === id);
    data["deleted"].push(deletedTodo[0]);
    data.todos = todos;
    const jsonStringified = JSON.stringify(data);
    fs.writeFile("./" + options.path, jsonStringified, (err) => {
      if (err) console.log(err);
      else console.log("Todo Deleted");
    });
  });

program
  .command("show-todos")
  .description("Show Todos from the file")
  .option("-p, --path <path>", "Path to File")
  .action((options) => {
    const data = require("./" + options.path);
    console.log(JSON.stringify(data, null, 2));
  });

program.parse();
