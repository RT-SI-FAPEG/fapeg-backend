import "express-async-errors";
import "reflect-metadata";
import * as dotenv from "dotenv";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { AppError } from "../../../shared/errors/AppError";
import { authRoutes } from "./routes/auth.routes";
import { indicatorsRoutes } from "./routes/indicators.routes";
import { searchRoutes } from "./routes/search.routes";
import { userRoutes } from "./routes/user.routes";
import { contactRoutes } from "./routes/contact.routes";
import { successStoriesRoutes } from "./routes/success-stories.routes";

dotenv.config();

export const app = express();

app.use(express.json());
app.use(cors());

app.use(authRoutes);
app.use(indicatorsRoutes);
app.use(searchRoutes);
app.use(userRoutes);
app.use(contactRoutes);
app.use(successStoriesRoutes);

// esse middleware deve vir depois de todas as rotas (tratamento global de exceptions)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    res.status(err.statusCode);
    res.json({ error: err.message });
  }

  res.status(500);
  res.json({ error: "Internal Server Error" });

  next(err);
});
