import { PostShpKelurahan } from "@/controller/uploadshp";
import { checkFiles, uploadMiddleware } from "@/middleware/uploadMidlleware";
import { Router } from "express";

const uploadRouter = Router();

uploadRouter.post("/bataskelurahan", uploadMiddleware, PostShpKelurahan); //post
uploadRouter.post("/batasblok");
uploadRouter.post("/bataspersil");

export default uploadRouter;
