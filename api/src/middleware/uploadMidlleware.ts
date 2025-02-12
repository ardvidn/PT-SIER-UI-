import multer from "multer";
import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";

// // Konfigurasi storage ke memory karena akan diproses dulu sebelum disimpan
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// export const uploadMiddleware = upload.fields([
//   { name: "shp", maxCount: 1 },
//   { name: "dbf", maxCount: 1 },
// ]);

// // Middleware untuk rename dan menyimpan file
// export const renameAndSaveFiles = (req: Request, res: Response, next: NextFunction) => {
//   try {
//     if (!req.files || !("shp" in req.files) || !("dbf" in req.files)) {
//       return res.status(400).json({ message: "Both .shp and .dbf files are required" });
//     }

//     const { kecamatan, kelurahan, jenis } = req.body;

//     console.log("Files received:", req.files);
//     console.log("Body received:", req.body);

//     if (!kecamatan || !jenis) {
//       return res.status(400).json({ message: "Kecamatan and Jenis are required" });
//     }

//     const uploadDir = path.join(__dirname, "../public/uploads/");

//     // Pastikan folder uploads ada, jika tidak, buat
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, { recursive: true });
//     }

//     // Format nama file: kecamatan_kelurahan_jenis.shp / .dbf
//     const shpFilename = `${kecamatan}_${kelurahan || "XX"}_${jenis}.shp`;
//     const dbfFilename = `${kecamatan}_${kelurahan || "XX"}_${jenis}.dbf`;

//     const shpFilePath = path.join(uploadDir, shpFilename);
//     const dbfFilePath = path.join(uploadDir, dbfFilename);

//     // Hapus file lama jika ada
//     if (fs.existsSync(shpFilePath)) fs.unlinkSync(shpFilePath);
//     if (fs.existsSync(dbfFilePath)) fs.unlinkSync(dbfFilePath);

//     // Simpan file baru dari buffer
//     fs.writeFileSync(shpFilePath, (req.files as any)["shp"][0].buffer);
//     fs.writeFileSync(dbfFilePath, (req.files as any)["dbf"][0].buffer);

//     console.log(`File tersimpan: ${shpFilename}, ${dbfFilename}`);

//     next();
//   } catch (error) {
//     console.error("Error processing files:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

/////////////////////////////////////////////////////////////////////////

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadDir = path.join(__dirname, "../public/uploads/");
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, { recursive: true });
//     }
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     const { kecamatan, kelurahan, jenis } = req.body;
//     const ext = path.extname(file.originalname); // Dapatkan ekstensi file
//     const filename = `${kecamatan}_${kelurahan || "XX"}_${jenis}${ext}`;
//     cb(null, filename);
//   },
// });

// const upload = multer({ storage });

// export const uploadMiddleware = upload.fields([
//   { name: "shp", maxCount: 1 },
//   { name: "dbf", maxCount: 1 },
// ]);

//////////////////////////////////////////////////////////////////////////////
// Konfigurasi storage dengan diskStorage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../../public/");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const { kecamatan, kelurahan, jenis } = req.body;
    if (!kecamatan || !jenis) {
      return cb(new Error("Kecamatan and Jenis are required"), "");
    }
    const ext = path.extname(file.originalname); // Dapatkan ekstensi file
    const filename = `${kecamatan}_${kelurahan || "XX"}_${jenis}${ext}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

export const uploadMiddleware = upload.fields([
  { name: "shp", maxCount: 1 },
  { name: "dbf", maxCount: 1 },
]);

export const validateUpload = (req: Request, res: Response, next: NextFunction) => {
  if (!req.files || !("shp" in req.files) || !("dbf" in req.files)) {
    return res.status(400).json({ message: "Both .shp and .dbf files are required" });
  }
  next();
};
