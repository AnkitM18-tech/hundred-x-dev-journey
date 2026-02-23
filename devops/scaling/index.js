import express from "express";

export const app = express();

console.log(`Worker node ${process.pid} has started`);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/pid", (req, res) => {
  res.send(`Worker node ${process.pid} is running`);
});

app.get("/api/:n", (req, res) => {
  let n = parseInt(req.params.n);
  let result = 0;
  if (n > 500000000000) n = 500000000000;
  for (let i = 0; i <= n; i++) {
    result += i;
  }
  res.send(`Result: ${result.toString()} from worker node ${process.pid}`);
});
