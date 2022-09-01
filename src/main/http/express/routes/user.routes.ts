import { Router } from "express";
import { CreateUserController } from "../../../../adapters/controllers/create-user.controller";
import { DeleteUserController } from "../../../../adapters/controllers/delete-user.controller";
import { GetUserDataController } from "../../../../adapters/controllers/get-user-data.controller";
import { ResetPasswordController } from "../../../../adapters/controllers/reset-password.controller";
import { UpdateUserController } from "../../../../adapters/controllers/update-user.controller";
import { CPFValidator } from "../../../../infra/cpf-validator";
import { DateValidator } from "../../../../infra/date-validator";
import { EmailValidator } from "../../../../infra/email-validator";
import { JwtDecoder } from "../../../../infra/jwt-decoder";
import { PasswordComparer } from "../../../../infra/password-comparer";
import { PasswordHasher } from "../../../../infra/password-hasher";
import { PasswordValidator } from "../../../../infra/password-validator";
import { UserRepositoryTypeorm } from "../../../../infra/repositories/typeorm/user-typeorm.repository";
import { SendMail } from "../../../../infra/send-mail";
import { CreateUserUseCase } from "../../../../usecases/interactors/create-user/create-user.usecase";
import { DeleteUserUseCase } from "../../../../usecases/interactors/delete-user.usecase";
import { GetUserDataUseCase } from "../../../../usecases/interactors/get-user-data.usecase";
import { ResetPasswordUseCase } from "../../../../usecases/interactors/reset-password.usecase";
import { UpdateUserUseCase } from "../../../../usecases/interactors/update-user.usecase";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

export const userRoutes = Router();

const cpfValidator = new CPFValidator();
const emailValidator = new EmailValidator();
const userRepository = new UserRepositoryTypeorm();
const passwordHasher = new PasswordHasher();
const passwordValidator = new PasswordValidator();
const sendMail = new SendMail();
const jwtDecoder = new JwtDecoder();
const passwordComparer = new PasswordComparer();
const dateValidator = new DateValidator();

// Criação de novo usuário
userRoutes.post("/user", async (req, res) => {
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

// userRoutes.get("/user", AuthMiddleware, async (req, res) => {
//   const listUsersUseCase = new ListUsersUseCase({
//     listUsersRepository: userRepository,
//   });
//   const listUsersController = new ListUsersController(listUsersUseCase);
//   const { statusCode, body } = await listUsersController.handle();
//   return res.status(statusCode).json(body);
// });

userRoutes.get("/user/:id", AuthMiddleware, async (req, res) => {
  const getUserDataUseCase = new GetUserDataUseCase({
    findUserByIdRepository: userRepository,
  });
  const getUserDataController = new GetUserDataController(getUserDataUseCase);
  const { statusCode, body } = await getUserDataController.handle(req);
  return res.status(statusCode).json(body);
});

// Recuperação de senha
userRoutes.put("/user/password", async (req, res) => {
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

// Update de dados
userRoutes.put("/user", AuthMiddleware, async (req, res) => {
  const updateUserUseCase = new UpdateUserUseCase({
    cpfValidator,
    dateValidator,
    emailValidator,
    findUserByDocument: userRepository,
    findUserById: userRepository,
    findUserRepository: userRepository,
    saveUserRepository: userRepository,
    updateUserRepository: userRepository,
  });

  const updateUserController = new UpdateUserController(updateUserUseCase);

  const result = await updateUserController.handle(req);

  return res.status(result.statusCode).send("");
});

userRoutes.delete("/user/:id", AuthMiddleware, async (req, res) => {
  const deleteUserUseCase = new DeleteUserUseCase({
    deleteUserRepository: userRepository,
  });
  const deleteUserController = new DeleteUserController(deleteUserUseCase);
  const result = await deleteUserController.handle(req);
  return res.status(result.statusCode).send("");
});
