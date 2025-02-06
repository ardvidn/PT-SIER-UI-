// import { Request, Response } from "express";
// import { open } from "shapefile";
// import proj4 from "proj4";
// import { AppDataSource } from "@/data-resource";
// import { BatasKecamatan } from "@/entity/batasKelurahan";

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
//           },
//           geometry: {
//             type: geometry.type,
//             coordinates: convertedCoordinates,
//           },
//         });
//       }
//     } while (!result.done);

//     const kelurahanRepo = AppDataSource.getRepository(BatasKecamatan);

//     // Hapus data lama jika sudah ada
//     const existingDataCount = await kelurahanRepo.count();
//     if (existingDataCount > 0) {
//       await kelurahanRepo.clear();
//     }

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

// import { Request, Response } from "express";
// import { open } from "shapefile";
// import proj4 from "proj4";
// import { AppDataSource } from "@/data-resource";
// import { BatasKecamatan } from "@/entity/batasKelurahan";

// // Definisi proyeksi UTM Zona 50S (EPSG:32750) dan WGS84 (EPSG:4326)
// const utm50s = "+proj=utm +zone=50 +south +datum=WGS84 +units=m +no_defs";
// const wgs84 = "+proj=longlat +datum=WGS84 +no_defs";

// export const uploadShpKelurahan = async (req: Request, res: Response) => {
//   try {
//     // Path ke file shapefile
//     const filePath =
//       "D:/PT SIER (UI)/template/api/public/ADM_murung_040924.shp";

//     // Buka file shapefile
//     const source = await open(filePath);

//     const kelurahanRepo = AppDataSource.getRepository(BatasKecamatan);

//     // Hapus data lama jika sudah ada
//     const existingDataCount = await kelurahanRepo.count();
//     if (existingDataCount > 0) {
//       await kelurahanRepo.clear();
//     }

//     let result;
//     do {
//       result = await source.read();
//       if (!result.done) {
//         const { properties, geometry } = result.value;
//         if (!geometry) continue;

//         let convertedCoordinates;
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
//             continue;
//         }

//         // Simpan data ke database
//         await kelurahanRepo
//           .createQueryBuilder()
//           .insert()
//           .into(BatasKecamatan)
//           .values({
//             KD_PROV: properties?.KD_PROV,
//             KD_KAB: properties?.KD_KAB,
//             KD_KEC: properties?.KD_KEC,
//             KD_KEL: properties?.KD_KEL,
//             NM_KEL: properties?.NM_KEL,
//           })
//           .execute();

//         // Update kolom geom dengan ST_GeomFromGeoJSON
//         await kelurahanRepo
//           .createQueryBuilder()
//           .update(BatasKecamatan)
//           .set({
//             geom: () =>
//               `ST_GeomFromGeoJSON('${JSON.stringify({
//                 type: geometry.type,
//                 coordinates: convertedCoordinates,
//               })}')`,
//           })
//           .where("kd_kel = :kd_kel", { kd_kel: properties?.KD_KEL })
//           .execute();
//       }
//     } while (!result.done);

//     return res.status(200).json({
//       code: 200,
//       data: source,
//       message: "File SHP dan DBF berhasil dikonversi dan disimpan ke database",
//     });
//   } catch (error) {
//     console.error("Error processing SHP file:", error);
//     return res.status(500).json({
//       code: 500,
//       message: "Internal Server Error",
//     });
//   }
// };

///////////////////////////////////////

import { Request, Response } from "express";
import { open } from "shapefile";
import proj4 from "proj4";
import { AppDataSource } from "@/data-resource";
import { BatasKecamatan } from "@/entity/batasKelurahan";

// Definisi proyeksi UTM Zona 50S (EPSG:32750) dan WGS84 (EPSG:4326)
const utm50s = "+proj=utm +zone=50 +south +datum=WGS84 +units=m +no_defs";
const wgs84 = "+proj=longlat +datum=WGS84 +no_defs";

export const shpkelurahan = async (req: Request, res: Response) => {
  try {
    // Path ke file SHP di server
    const filePath =
      "D:/PT SIER (UI)/template/api/public/ADM_murung_040924.shp";

    // Buka file SHP
    const source = await open(filePath);

    // Repository database
    const kelurahanRepo = AppDataSource.getRepository(BatasKecamatan);

    // Hapus data lama jika sudah ada
    await kelurahanRepo.clear();

    // Simpan GeoJSON ke dalam array
    const geojsonFeatures: any[] = [];

    let result;
    do {
      result = await source.read();
      if (!result.done) {
        const { properties, geometry } = result.value;
        if (!geometry) continue;

        let convertedCoordinates;

        // Konversi koordinat ke WGS84 (EPSG:4326)
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
            continue;
        }

        // Validasi apakah geometri sudah dikonversi
        if (!convertedCoordinates || convertedCoordinates.length === 0) {
          console.warn(`Geometri tidak valid untuk ${properties?.NM_KEL}`);
          continue;
        }

        // Format GeoJSON untuk database
        const geoJsonData = {
          type: geometry.type,
          coordinates: convertedCoordinates,
        };

        // Tambahkan ke array GeoJSON
        geojsonFeatures.push({
          type: "Feature",
          properties: {
            KD_PROV: properties?.KD_PROV,
            KD_KAB: properties?.KD_KAB,
            KD_KEC: properties?.KD_KEC,
            KD_KEL: properties?.KD_KEL,
            NM_KEL: properties?.NM_KEL,
          },
          geometry: geoJsonData,
        });

        // Simpan ke database
        await kelurahanRepo
          .createQueryBuilder()
          .insert()
          .into(BatasKecamatan)
          .values({
            KD_PROV: properties?.KD_PROV,
            KD_KAB: properties?.KD_KAB,
            KD_KEC: properties?.KD_KEC,
            KD_KEL: properties?.KD_KEL,
            NM_KEL: properties?.NM_KEL,
          })
          .execute();

        // Update kolom geom dengan ST_GeomFromGeoJSON
        await kelurahanRepo
          .createQueryBuilder()
          .update(BatasKecamatan)
          .set({
            geom: () => `ST_GeomFromGeoJSON('${JSON.stringify(geoJsonData)}')`,
          })
          .where("KD_KEL = :KD_KEL", { KD_KEL: properties?.KD_KEL })
          .execute();
      }
    } while (!result.done);

    return res.status(200).json({
      code: 200,
      data: geojsonFeatures,
      message: "File SHP berhasil dikonversi dan disimpan ke database",
    });
  } catch (error) {
    console.error("Error membaca file SHP:", error);
    return res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};
