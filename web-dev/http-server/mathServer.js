const express = require("express");
const cors = require("cors");

const app = express();

let requestCount = 0;

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  requestCount++;
  next();
});

app.post("/sum", (req, res) => {
  const a = parseInt(req.body.a);
  const b = parseInt(req.body.b);
  return res.status(200).json({ sum: a + b });
});

app.get("/subtract", (req, res) => {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);
  return res.status(200).json({ difference: a - b });
});

app.get("/multiply", (req, res) => {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);
  return res.status(200).json({ product: a * b });
});

app.get("/divide", (req, res) => {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);
  if (b === 0) throw new Error("Arithmatic Error: Division by Zero");
  return res.status(200).json({ division: a / b });
});

app.get("/request-count", (req, res) => {
  return res.status(200).json({ requestCount });
});

app.use((err, req, res, next) => {
  if (err) {
    return res.status(400).json({ message: "Probably some bad inputs" });
  }
});

app.listen(3000, () => {
  console.log(`Server is running at port 3000`);
});
