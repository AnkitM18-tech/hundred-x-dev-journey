import dotenv from "dotenv";
import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { connectToDB } from "./db/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

import authRouter from "./routes/auth.routes.js";
import contentRouter from "./routes/content.routes.js";
import shareRouter from "./routes/share.routes.js";

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/content", contentRouter);
app.use("/api/v1/brain", shareRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  return res.status(500).json({ message: err });
});

connectToDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`⚙️ Server is listening on Port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(`Error connecting to the Database: ${error}`);
  });
