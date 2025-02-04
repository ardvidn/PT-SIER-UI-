import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(__dirname, "../.env") });

export const PORT = process.env.PORT || 8080;
export const DATABASE_URL = process.env.DATABASE_URL || "3306";
