import { shpkelurahan } from "@/controller/uploadshp";
import { Router } from "express";

const uploadRouter = Router();

uploadRouter.post("/bataskelurahan", shpkelurahan); //post
uploadRouter.post("/bataasblok");
uploadRouter.post("/bataspersil");

export default uploadRouter;
