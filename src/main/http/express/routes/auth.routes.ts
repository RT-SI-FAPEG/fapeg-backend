import { Router } from "express";
import { AuthUserController } from "../../../../adapters/controllers/auth-user.controller";
import { EmailValidator } from "../../../../infra/email-validator";
import { JwtCreator } from "../../../../infra/jwt-creator";
import { PasswordComparer } from "../../../../infra/password-comparer";
import { UserRepositoryTypeorm } from "../../../../infra/repositories/typeorm/user-typeorm.repository";
import { AuthUserUseCase } from "../../../../usecases/interactors/auth-user/auth-user.usecase";

export const authRoutes = Router();

const emailValidator = new EmailValidator();
const userRepository = new UserRepositoryTypeorm();
const jwtCreator = new JwtCreator();
const passwordComparer = new PasswordComparer();

// Autenticação de usuário
authRoutes.post("/auth", async (req, res) => {
  const authUserUseCase = new AuthUserUseCase({
    emailValidator,
    findUserByEmailRepository: userRepository,
    jwtCreator,
    passwordComparer,
  });

  const authUserController = new AuthUserController(authUserUseCase);

  const result = await authUserController.handle(req);

  return res.status(result.statusCode).json(result.body);
});
