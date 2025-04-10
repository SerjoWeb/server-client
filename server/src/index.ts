import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";

import router from "./router"
import exceptionMiddleware from "./middleware/exception.middleware";

dotenv.config();

const app = express();

app.use(cors({
  credentials: true
}));

app.use(compression());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/api", router());
app.use(exceptionMiddleware);

const server = http.createServer(app);
const port = process.env.WEBSITES_PORT || 8080;

const start = async () => {
  try {
    server.listen(port, () => console.log(`Server running on http://localhost:${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
