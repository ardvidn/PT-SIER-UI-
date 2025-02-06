import multer from "multer";
import { Request, Response, NextFunction } from "express";

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const uploadMiddleware = upload.fields([
  { name: "shp", maxCount: 1 },
  { name: "dbf", maxCount: 1 },
]);

export const checkFiles = (req: Request, res: Response, next: NextFunction) => {
  if (!req.files || !("shp" in req.files) || !("dbf" in req.files)) {
    return res
      .status(400)
      .json({ message: "Both .shp and .dbf files are required" });
  }
  next();
};
