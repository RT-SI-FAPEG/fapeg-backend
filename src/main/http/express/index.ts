import "express-async-errors";
import "reflect-metadata";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { AuthUserController } from "../../../adapters/controllers/auth-user.controller";
import { CreateUserController } from "../../../adapters/controllers/create-user.controller";
import { ListUsersController } from "../../../adapters/controllers/list-users.controller";
import { ResetPasswordController } from "../../../adapters/controllers/reset-password.controller";
import { CPFValidator } from "../../../infra/cpf-validator";
import { EmailValidator } from "../../../infra/email-validator";
import { JwtCreator } from "../../../infra/jwt-creator";
import { JwtDecoder } from "../../../infra/jwt-decoder";
import { PasswordComparer } from "../../../infra/password-comparer";
import { PasswordHasher } from "../../../infra/password-hasher";
import { PasswordValidator } from "../../../infra/password-validator";
import { UserRepositoryInMemory } from "../../../infra/repositories/in-memory/user-in-memory.repository";
import { SendMail } from "../../../infra/send-mail";
import { AppError } from "../../../shared/errors/AppError";
import { AuthUserUseCase } from "../../../usecases/auth-user.usecase";
import { CreateUserUseCase } from "../../../usecases/create-user.usecase";
import { ListUsersUseCase } from "../../../usecases/list-users.usecase";
import { ResetPasswordUseCase } from "../../../usecases/reset-password.usecase";
import { ListSearchesController } from "../../../adapters/controllers/list-searches.controller";
import { ListSearchesUseCase } from "../../../usecases/list-searches.usecase";
import { DateValidator } from "../../../infra/date-validator";
import { ListIndicatorsUseCase } from "../../../usecases/list-indicators.usecase";
import { ListIndicatorsController } from "../../../adapters/controllers/list-indicators.controller";
import { AppDataSource } from "../../../database";
import { UserRepositoryTypeorm } from "../../../infra/repositories/typeorm/user-typeorm.repository";
import { AuthMiddleware } from "../../../middlewares/AuthMiddleware";

const app = express();

app.use(express.json());
app.use(cors());

const cpfValidator = new CPFValidator();
const emailValidator = new EmailValidator();
const userRepository = new UserRepositoryTypeorm();
const passwordHasher = new PasswordHasher();
const passwordValidator = new PasswordValidator();
const sendMail = new SendMail();
const jwtDecoder = new JwtDecoder();
const passwordComparer = new PasswordComparer();
const jwtCreator = new JwtCreator();
const dateValidator = new DateValidator();

// Criação de novo usuário
app.post("/user", async (req, res) => {
  const createUserUseCase = new CreateUserUseCase({
    cpfValidator,
    emailValidator,
    findUserRepository: userRepository,
    passwordHasher,
    passwordValidator,
    saveUserRepository: userRepository,
    sendMail,
    dateValidator,
    findUserByDocument: userRepository,
  });

  const createUserController = new CreateUserController(createUserUseCase);

  const { statusCode } = await createUserController.handle(req);

  return res.status(statusCode).send();
});

// app.get("/user", AuthMiddleware, async (req, res) => {
//   const listUsersUseCase = new ListUsersUseCase({
//     listUsersRepository: userRepository,
//   });
//   const listUsersController = new ListUsersController(listUsersUseCase);
//   const { statusCode, body } = await listUsersController.handle();
//   return res.status(statusCode).json(body);
// });

// Recuperação de senha
app.put("/user/password", async (req, res) => {
  const resetPasswordUseCase = new ResetPasswordUseCase({
    findUserByIdRepository: userRepository,
    jwtDecoder,
    passwordHasher,
    passwordComparer,
    updateUserPasswordRepository: userRepository,
    passwordValidator,
  });
  const resetPasswordController = new ResetPasswordController(
    resetPasswordUseCase
  );
  const result = await resetPasswordController.handle(req);
  return res.status(result.statusCode).send("");
});

// Autenticação de usuário
app.post("/auth", async (req, res) => {
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

// Listagem de pesquisas
app.get("/searches", AuthMiddleware, async (req, res) => {
  const listSearchesUseCase = new ListSearchesUseCase();

  const listSearchesController = new ListSearchesController(
    listSearchesUseCase
  );

  const result = await listSearchesController.handle();

  return res.status(result.statusCode).json(result.body);
});

// Listagem de indicadores
app.get("/indicators", AuthMiddleware, async (req, res) => {
  const listIndicatorsUseCase = new ListIndicatorsUseCase();
  const listIndicatorsController = new ListIndicatorsController(
    listIndicatorsUseCase
  );
  const result = await listIndicatorsController.handle();
  return res.status(result.statusCode).json(result.body);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    res.status(err.statusCode);
    res.json({ error: err.message });
  }

  res.status(500);
  res.json({ error: "Internal Server Error" });

  next(err);
});

app.listen(process.env.PORT || 3333, () => {
  console.log("server is running");

  AppDataSource.initialize().then(() =>
    console.log("database connection stabilished")
  );
});
