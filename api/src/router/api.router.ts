import { Router } from "express";
import uploadRouter from "./upload.router";
import retrieveRouter from "./retrieve.roter";

const apiRouter = Router();

apiRouter.use("/upload", uploadRouter);
apiRouter.use("/retrieve", retrieveRouter);

export default apiRouter;
