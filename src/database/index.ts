import { DataSource } from "typeorm";
import { UserEntity } from "./entities/User";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "fapeg.db",
  synchronize: false,
  logging: false,
  entities: [UserEntity],
  migrationsRun: true,
  migrations: [__dirname + "/migrations/*.ts"],
});
