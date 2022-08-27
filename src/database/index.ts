import { DataSource } from "typeorm";
import { Data } from "../entities/teste";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "fapeg",
  synchronize: false,
  logging: true,
  entities: [Data],
  migrations: ["src/database/migrations/*.ts"],
});
