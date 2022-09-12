import { Router } from "express";
import { ActivateAccountController } from "../../../../adapters/controllers/activate-account.controller";
import { CreateUserController } from "../../../../adapters/controllers/create-user.controller";
import { DeleteUserController } from "../../../../adapters/controllers/delete-user.controller";
import { GetUserDataController } from "../../../../adapters/controllers/get-user-data.controller";
import { ResendConfirmationMailController } from "../../../../adapters/controllers/resend-confirmation-mail.controller";
import { ResetPasswordController } from "../../../../adapters/controllers/reset-password.controller";
import { SendResetPasswordMailController } from "../../../../adapters/controllers/send-reset-password-mail.controller";
import { UpdateUserController } from "../../../../adapters/controllers/update-user.controller";
import { CPFValidator } from "../../../../infra/cpf-validator";
import { DateValidator } from "../../../../infra/date-validator";
import { EmailValidator } from "../../../../infra/email-validator";
import { JwtCreator } from "../../../../infra/jwt-creator";
import { JwtDecoder } from "../../../../infra/jwt-decoder";
import { PasswordComparer } from "../../../../infra/password-comparer";
import { PasswordHasher } from "../../../../infra/password-hasher";
import { PasswordValidator } from "../../../../infra/password-validator";
import { UserRepositoryTypeorm } from "../../../../infra/repositories/typeorm/user-typeorm.repository";
import { SendMail } from "../../../../infra/send-mail";
import { ActivateAccountUseCase } from "../../../../usecases/interactors/activate-account/activate-account.usecase";
import { CreateUserUseCase } from "../../../../usecases/interactors/create-user/create-user.usecase";
import { DeleteUserUseCase } from "../../../../usecases/interactors/delete-user/delete-user.usecase";
import { GetUserDataUseCase } from "../../../../usecases/interactors/get-user-data/get-user-data.usecase";
import { ResendConfirmationMailUseCase } from "../../../../usecases/interactors/resend-confirmation-mail/resend-confirmation-mail.usecase";
import { ResetPasswordUseCase } from "../../../../usecases/interactors/reset-password/reset-password.usecase";
import { SendResetPasswordMailUseCase } from "../../../../usecases/interactors/send-reset-password-mail/send-reset-password-mail.usecase";
import { UpdateUserUseCase } from "../../../../usecases/interactors/update-user/update-user.usecase";
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
const jwtCreator = new JwtCreator();

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
    tokenGenerator: jwtCreator,
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

  const { statusCode } = await resetPasswordController.handle(req);

  return res.status(statusCode).send("");
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

  const { statusCode } = await updateUserController.handle(req);

  return res.status(statusCode).send("");
});

userRoutes.delete("/user/:id", AuthMiddleware, async (req, res) => {
  const deleteUserUseCase = new DeleteUserUseCase({
    deleteUserRepository: userRepository,
    findUserByIdRepository: userRepository,
  });
  const deleteUserController = new DeleteUserController(deleteUserUseCase);
  const { statusCode } = await deleteUserController.handle(req);
  return res.status(statusCode).send("");
});

userRoutes.post("/user/resend-confirmation-mail", async (req, res) => {
  const resendConfirmationMailUseCase = new ResendConfirmationMailUseCase({
    findUserByIdRepository: userRepository,
    sendMail,
    tokenGenerator: jwtCreator,
  });

  const resendConfirmationMailController = new ResendConfirmationMailController(
    resendConfirmationMailUseCase
  );

  const { statusCode } = await resendConfirmationMailController.handle(req);

  return res.status(statusCode).send("");
});

userRoutes.post("/user/send-reset-password-mail", async (req, res) => {
  const sendResetPasswordMailUseCase = new SendResetPasswordMailUseCase({
    sendMail,
    findUserByIdRepository: userRepository,
    tokenGenerator: jwtCreator,
  });

  const sendResetPasswordMailController = new SendResetPasswordMailController(
    sendResetPasswordMailUseCase
  );

  const { statusCode } = await sendResetPasswordMailController.handle(req);

  return res.status(statusCode).send("");
});

// user/activate - Token - Body

userRoutes.post("/user/activate", async (req, res) => {
  const activateAccountUseCase = new ActivateAccountUseCase({
    findUserByIdRepository: userRepository,
    tokenValidator: jwtDecoder,
    updateUserRepository: userRepository,
  });

  const activateAccontController = new ActivateAccountController(
    activateAccountUseCase
  );

  const { statusCode } = await activateAccontController.handle(req);

  return res.status(statusCode).send("");
});
