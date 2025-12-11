require("dotenv").config();
const express = require("express");

const { connectToDB } = require("./db");

const app = express();
const PORT = 3000;

app.use(express.json());

const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
const courseRouter = require("./routes/course");

app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/courses", courseRouter);

connectToDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`⚙️ Server is listening on PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to DB:", error);
  });
