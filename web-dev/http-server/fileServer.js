const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.get("/files", (req, res) => {
  const directory = path.join(__dirname, "/files");
  fs.readdir(directory, "utf-8", (err, files) => {
    if (err)
      return res.status(400).json({ message: "Error reading the directory" });
    else return res.status(200).json({ files });
  });
});

app.get("/files/:fileName", (req, res) => {
  const { fileName } = req.params;
  const filePath = path.join(__dirname, "/files/", fileName);
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) return res.status(400).json({ message: "Error reading the file" });
    else
      return res.status(200).json({
        data,
      });
  });
});

app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});
