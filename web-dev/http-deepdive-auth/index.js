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

app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  if (users.find((user) => user.username === username))
    return res.status(400).json({ message: "You have already signed up." });
  else users.push({ username, password });
  return res.status(201).json({ message: "You have signed up." });
});

app.post("/signin", (req, res) => {
  const { username, password } = req.body;
  let user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (!user) {
    return res.status(401).json({ message: "Invalid Username or Password" });
  } else {
    req.headers.authorization = jwt.sign({ username }, JWT_SECRET);
    return res.status(200).json({ token: req.headers.authorization });
  }
});

app.get("/me", (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, JWT_SECRET);
  let user = users.find((user) => user.username === decoded.username);
  if (!user) return res.status(401).json({ message: "Unauthorized" });
  return res.status(200).json({ user });
});

app.listen(3000, () => console.log("Server is running on Port 3000"));
