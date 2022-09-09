import { Router } from "express";
import { ListSuccessStoriesController } from "../../../../adapters/controllers/list-success-stories.controller";
import { ListSuccessStoriesUseCase } from "../../../../usecases/interactors/list-success-stories/list-success-stories.usecase";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

export const successStoriesRoutes = Router();

successStoriesRoutes.get(
  "/success-stories",
  AuthMiddleware,
  async (req, res) => {
    const listSuccessStoriesUseCase = new ListSuccessStoriesUseCase();

    const listSuccessStoriesController = new ListSuccessStoriesController(
      listSuccessStoriesUseCase
    );

    const result = await listSuccessStoriesController.handle();

    return res.status(result.statusCode).json(result.body);
  }
);
