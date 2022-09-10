import { DataSource } from "typeorm";
import { UserEntity } from "./entities/User";

console.log(__dirname + "/migrations/*.js");

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "fapeg.db",
  synchronize: false,
  logging: false,
  entities: [UserEntity],
  migrationsRun: true,
  migrations: ["src/database/migrations/*.ts"],
});
