import { DataSource } from "typeorm";
import { UserEntity } from "./entities/User";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "fapeg.db",
  synchronize: false,
  logging: false,
  entities: [UserEntity],
  migrations: ["src/database/migrations/*.ts"],
});
