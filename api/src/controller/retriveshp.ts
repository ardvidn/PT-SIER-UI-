import { Request, Response } from "express";
import { AppDataSource } from "@/data-resource";
import { BatasKecamatan } from "@/entity/batasKelurahan";

export const getBatasKecamatan = async (req: Request, res: Response) => {
  try {
    const kelurahanRepo = AppDataSource.getRepository(BatasKecamatan);

    // Cek apakah ada data di dalam tabel
    const count = await kelurahanRepo.count();
    if (count === 0) {
      return res.status(404).json({
        code: 404,
        message: "Data tidak tersedia",
      });
    }

    // Ambil semua data dari tabel batas_kecamatan
    const batasData = await kelurahanRepo
      .createQueryBuilder("batas")
      .select([
        "ST_AsGeoJSON(batas.geom) as geometry", // Ambil geometri dalam format GeoJSON
        "batas.KD_PROV",
        "batas.KD_KAB",
        "batas.KD_KEC",
        "batas.KD_KEL",
        "batas.NM_KEL",
      ])
      .getRawMany();

    // Konversi hasil query ke format GeoJSON
    const geojson = {
      data: batasData.map((data: any) => ({
        type: "Feature",
        properties: {
          KD_PROV: data.batas_KD_KEC,
          KD_KAB: data.batas_KD_KAB,
          KD_KEC: data.batas_KD_KEC,
          KD_KEL: data.batas_KD_KEL,
          NM_KEL: data.batas_NM_KEL,
        },
        geometry: JSON.parse(data.geometry), // Parsing string GeoJSON menjadi objek
      })),
    };

    return res.status(200).json({
      code: 200,
      data: geojson.data,
      message: "Data batas kecamatan berhasil diambil",
    });
  } catch (error) {
    console.error("Error mengambil data batas kecamatan:", error);
    return res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};
