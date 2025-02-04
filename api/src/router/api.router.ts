import { Router } from "express";
import uploadRouter from "./upload.router";

const apiRouter = Router();

apiRouter.use("/convert", uploadRouter);

export default apiRouter;
