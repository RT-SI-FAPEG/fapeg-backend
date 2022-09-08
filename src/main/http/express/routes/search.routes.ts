import { Router } from "express";
import { ListSearchesController } from "../../../../adapters/controllers/list-searches.controller";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { ListSearchesUseCase } from "../../../../usecases/interactors/list-searches/list-searches.usecase";

export const searchRoutes = Router();

// Listagem de pesquisas
searchRoutes.post("/searches", AuthMiddleware, async (req, res) => {
  const listSearchesUseCase = new ListSearchesUseCase();

  const listSearchesController = new ListSearchesController(
    listSearchesUseCase
  );

  const result = await listSearchesController.handle(req);

  return res.status(result.statusCode).json(result.body);
});
