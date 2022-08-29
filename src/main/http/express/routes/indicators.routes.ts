import { Router } from "express";
import { ListIndicatorsController } from "../../../../adapters/controllers/list-indicators.controller";
import { ListSearchesController } from "../../../../adapters/controllers/list-searches.controller";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { ListIndicatorsUseCase } from "../../../../usecases/interactors/list-indicators.usecase";

export const indicatorsRoutes = Router();

// Listagem de indicadores
indicatorsRoutes.get("/indicators", AuthMiddleware, async (req, res) => {
  const listIndicatorsUseCase = new ListIndicatorsUseCase();
  const listIndicatorsController = new ListIndicatorsController(
    listIndicatorsUseCase
  );
  const result = await listIndicatorsController.handle();
  return res.status(result.statusCode).json(result.body);
});
