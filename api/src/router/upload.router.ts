import { shpkelurahan } from "@/controller/uploadshp";
import { checkFiles, uploadMiddleware } from "@/middleware/uploadMidlleware";
import { Router } from "express";

const uploadRouter = Router();

uploadRouter.post("/bataskelurahan", uploadMiddleware, shpkelurahan); //post
uploadRouter.post("/bataasblok");
uploadRouter.post("/bataspersil");

export default uploadRouter;
