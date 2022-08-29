import { app } from "./app";
import { AppDataSource } from "../../../database";

app.listen(process.env.PORT || 3333, () => {
  console.log("server is running");

  AppDataSource.initialize().then(() =>
    console.log("database connection stabilished")
  );
});
