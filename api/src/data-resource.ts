import { DataSource } from "typeorm";
import { BatasKecamatan } from "./entity/batasKelurahan";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "root",
  database: "gismura",
  synchronize: true,
  logging: true,
  entities: [BatasKecamatan],
  subscribers: [],
  migrations: [],
});
