import multer from "multer";
import { Request, Response, NextFunction } from "express";

const storage = multer.memoryStorage();
