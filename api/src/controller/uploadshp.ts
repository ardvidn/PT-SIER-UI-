// import { Request, Response } from "express";
// import { open } from "shapefile";

// export const convertshp = async (req: Request, res: Response) => {
//   try {
//     // Path ke file shapefile
//     const filePath =
//       "D:/PT SIER (UI)/template/api/public/ADM_murung_040924.shp";

//     // Buka file shapefile
//     const source = await open(filePath);

//     // Array untuk menyimpan semua fitur
//     const features: any[] = [];
//     const tipe = typeof features;

//     let result;
//     do {
//       result = await source.read();
//       if (!result.done) {
//         features.push(result.value); // Simpan setiap fitur ke array
//       }
//     } while (!result.done);

//     return res.status(200).json({
//       code: 200,
//       data: features, // Kirim semua fitur sebagai response
//       //   tipe,
//       message: "File SHP berhasil dikonversi",
//     });
//   } catch (error) {
//     console.error("Error membaca file SHP:", error); // Log error untuk debug
//     return res.status(500).json({
//       code: 500,
//       message: "Internal server error",
//     });
//   }
// };

// import { Request, Response } from "express";
// import { open } from "shapefile";
// import proj4 from "proj4";

// // Definisi proyeksi UTM Zona 50S (EPSG:32750) dan WGS84 (EPSG:4326)
// const utm50s = "+proj=utm +zone=50 +south +datum=WGS84 +units=m +no_defs";
// const wgs84 = "+proj=longlat +datum=WGS84 +no_defs";

// export const convertshp = async (req: Request, res: Response) => {
//   try {
//     // Path ke file shapefile
//     const filePath =
//       "D:/PT SIER (UI)/template/api/public/ADM_murung_040924.shp";

//     // Buka file shapefile
//     const source = await open(filePath);

//     // Array untuk menyimpan data hasil konversi
//     const geojsonFeatures: any[] = [];

//     let result;
//     let idCounter = 1; // Inisialisasi ID (otomatis)
//     do {
//       result = await source.read();
//       if (!result.done) {
//         const { properties, geometry } = result.value;

//         if (!geometry) {
//           continue; // Skip jika geometry tidak ada
//         }

//         let convertedCoordinates;

//         // Periksa tipe geometri sebelum memproses koordinat
//         switch (geometry.type) {
//           case "Point":
//             convertedCoordinates = proj4(utm50s, wgs84, geometry.coordinates);
//             break;

//           case "Polygon":
//             convertedCoordinates = geometry.coordinates.map((ring: any) =>
//               ring.map((point: any) => proj4(utm50s, wgs84, point))
//             );
//             break;

//           case "MultiPolygon":
//             convertedCoordinates = geometry.coordinates.map((polygon: any) =>
//               polygon.map((ring: any) =>
//                 ring.map((point: any) => proj4(utm50s, wgs84, point))
//               )
//             );
//             break;

//           default:
//             console.warn(`Geometry type ${geometry.type} is not supported`);
//             continue; // Skip jika tipe geometri tidak didukung
//         }

//         // Format GeoJSON dengan koordinat yang sudah dikonversi
//         geojsonFeatures.push({
//           id: idCounter++, // Auto increment ID
//           geom: {
//             type: geometry.type,
//             coordinates: convertedCoordinates,
//           }, // Geometri setelah transformasi
//           KD_PROV: properties?.KD_PROV,
//           KD_KAB: properties?.KD_KAB,
//           KD_KEC: properties?.KD_KEC,
//           KD_KEL: properties?.KD_KEL,
//           NM_KEL: properties?.NM_KEL,
//         });
//       }
//     } while (!result.done);

//     return res.status(200).json({
//       code: 200,
//       data: geojsonFeatures, // Data GeoJSON yang sudah diproses
//       message: "File SHP berhasil dikonversi ke GeoJSON dengan proyeksi WGS84",
//     });
//   } catch (error) {
//     console.error("Error membaca file SHP:", error); // Log error untuk debug
//     return res.status(500).json({
//       code: 500,
//       message: "Internal server error",
//     });
//   }
// };

// import { Request, Response } from "express";
// import { open } from "shapefile";
// import proj4 from "proj4";
// import prisma from "@/prisma";

// // Definisi proyeksi UTM Zona 50S (EPSG:32750) dan WGS84 (EPSG:4326)
// const utm50s = "+proj=utm +zone=50 +south +datum=WGS84 +units=m +no_defs";
// const wgs84 = "+proj=longlat +datum=WGS84 +no_defs";

// export const shpkelurahan = async (req: Request, res: Response) => {
//   try {
//     // Path ke file shapefile
//     const filePath =
//       "D:/PT SIER (UI)/template/api/public/ADM_murung_040924.shp";

//     // Buka file shapefile
//     const source = await open(filePath);

//     // Array untuk menyimpan data GeoJSON
//     const geojsonFeatures: any[] = [];

//     let result;
//     do {
//       result = await source.read();
//       if (!result.done) {
//         const { properties, geometry } = result.value;

//         if (!geometry) {
//           continue; // Skip jika geometry tidak ada
//         }

//         let convertedCoordinates;

//         // Periksa tipe geometri sebelum memproses koordinat
//         switch (geometry.type) {
//           case "Point":
//             convertedCoordinates = proj4(utm50s, wgs84, geometry.coordinates);
//             break;

//           case "Polygon":
//             convertedCoordinates = geometry.coordinates.map((ring: any) =>
//               ring.map((point: any) => proj4(utm50s, wgs84, point))
//             );
//             break;

//           case "MultiPolygon":
//             convertedCoordinates = geometry.coordinates.map((polygon: any) =>
//               polygon.map((ring: any) =>
//                 ring.map((point: any) => proj4(utm50s, wgs84, point))
//               )
//             );
//             break;

//           default:
//             console.warn(`Geometry type ${geometry.type} is not supported`);
//             continue; // Skip jika tipe geometri tidak didukung
//         }

//         // Tambahkan fitur GeoJSON ke array
//         geojsonFeatures.push({
//           type: "Feature",
//           properties: {
//             KD_PROV: properties?.KD_PROV,
//             KD_KAB: properties?.KD_KAB,
//             KD_KEC: properties?.KD_KEC,
//             KD_KEL: properties?.KD_KEL,
//             NM_KEL: properties?.NM_KEL,
//             // KD_BLOK: properties?.KD_KEL,
//             // NO_URUT: properties?.NO_URUT,
//             // KD_JNS_OP: properties?.KD_JNS_OP,
//           },
//           geometry: {
//             type: geometry.type,
//             coordinates: convertedCoordinates,
//           },
//         });
//       }
//     } while (!result.done);

//     // Format GeoJSON
//     // const geojson = {
//     //   type: "FeatureCollection",
//     //   features: geojsonFeatures,
//     // };

//     return res.status(200).json({
//       code: 200,
//       data: geojsonFeatures, // Data GeoJSON sesuai format
//       message: "File SHP berhasil dikonversi ke GeoJSON dengan proyeksi WGS84",
//     });
//   } catch (error) {
//     console.error("Error membaca file SHP:", error); // Log error untuk debug
//     return res.status(500).json({
//       code: 500,
//       message: "Internal server error",
//     });
//   }
// };

//////////////////////////////

import { Request, Response } from "express";
import { open } from "shapefile";
import proj4 from "proj4";

// Definisi proyeksi UTM Zona 50S (EPSG:32750) dan WGS84 (EPSG:4326)
const utm50s = "+proj=utm +zone=50 +south +datum=WGS84 +units=m +no_defs";
const wgs84 = "+proj=longlat +datum=WGS84 +no_defs";

export const shpkelurahan = async (req: Request, res: Response) => {
  try {
    // Path ke file shapefile
    const filePath =
      "D:/PT SIER (UI)/template/api/public/ADM_murung_040924.shp";

    // Buka file shapefile
    const source = await open(filePath);

    // Array untuk menyimpan data GeoJSON
    const geojsonFeatures: any[] = [];

    let result;
    do {
      result = await source.read();
      if (!result.done) {
        const { properties, geometry } = result.value;

        if (!geometry) {
          continue; // Skip jika geometry tidak ada
        }

        let convertedCoordinates;

        // Periksa tipe geometri sebelum memproses koordinat
        switch (geometry.type) {
          case "Point":
            convertedCoordinates = proj4(utm50s, wgs84, geometry.coordinates);
            break;

          case "Polygon":
            convertedCoordinates = geometry.coordinates.map((ring: any) =>
              ring.map((point: any) => proj4(utm50s, wgs84, point))
            );
            break;

          case "MultiPolygon":
            convertedCoordinates = geometry.coordinates.map((polygon: any) =>
              polygon.map((ring: any) =>
                ring.map((point: any) => proj4(utm50s, wgs84, point))
              )
            );
            break;

          default:
            console.warn(`Geometry type ${geometry.type} is not supported`);
            continue; // Skip jika tipe geometri tidak didukung
        }

        // Format fitur GeoJSON
        const geojsonFeature = {
          type: "Feature",
          properties: {
            KD_PROV: properties?.KD_PROV,
            KD_KAB: properties?.KD_KAB,
            KD_KEC: properties?.KD_KEC,
            KD_KEL: properties?.KD_KEL,
            NM_KEL: properties?.NM_KEL,
          },
          geometry: {
            type: geometry.type,
            coordinates: convertedCoordinates,
          },
        };

        geojsonFeatures.push(geojsonFeature);

        // Simpan ke database PostgreSQL dengan PostGIS
      }
    } while (!result.done);

    return res.status(200).json({
      code: 200,
      data: geojsonFeatures, // Data GeoJSON sesuai format
      message:
        "File SHP berhasil dikonversi dan disimpan ke database dengan proyeksi WGS84",
    });
  } catch (error) {
    console.error("Error membaca file SHP atau menyimpan ke database:", error); // Log error untuk debug
    return res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};
