import { getBatasKecamatan } from "@/controller/retriveshp";
import { Router } from "express";

const retrieveRouter = Router();

retrieveRouter.get("/bataskelurahan", getBatasKecamatan);

export default retrieveRouter;
