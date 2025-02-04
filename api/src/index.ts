import express, { NextFunction, Request, Response, urlencoded } from "express";
import cors from "cors";
import apiRouter from "./router/api.router";
import "reflect-metadata";
import { PORT } from "./config";

const app = express();

app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
app.use(urlencoded({ extended: true }));
app.use("/api", apiRouter);
app.use("/public", express.static("./public"));

app.listen(PORT, () => {
  console.log(`  ➜  [API] Local: http://localhost:${PORT}/`);
});

app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "API is working",
  });
});
