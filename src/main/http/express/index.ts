import "express-async-errors";
import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import cors from "cors";
import { CreateUserController } from "../../../adapters/controllers/create-user.controller";
import { CreateUserUseCase } from "../../../usecases/create-user.usecase";
import { CNPJValidator } from "../../../infra/cnpj-validator";
import { CPFValidator } from "../../../infra/cpf-validator";
import { EmailValidator } from "../../../infra/email-validator";
import { UserRepositoryInMemory } from "../../../infra/repositories/in-memory/user-in-memory.repository";
import { PasswordHasher } from "../../../infra/password-hasher";
import { PasswordValidator } from "../../../infra/passwordValidator";
import { SendMail } from "../../../infra/send-mail";
import { AppError } from "../../../shared/errors/AppError";

const app = express();

app.use(express.json());
app.use(cors());

const cnpjValidator = new CNPJValidator();
const cpfValidator = new CPFValidator();
const emailValidator = new EmailValidator();
const userRepositoryInMemory = UserRepositoryInMemory.getInstance();
const passwordHasher = new PasswordHasher();
const passwordValidator = new PasswordValidator();
const sendMail = new SendMail();

app.post("/user", async (req, res) => {
  const createUserUseCase = new CreateUserUseCase({
    cnpjValidator,
    cpfValidator,
    emailValidator,
    findUserRepository: userRepositoryInMemory,
    passwordHasher,
    passwordValidator,
    saveUserRepository: userRepositoryInMemory,
    sendMail,
  });

  const createUserController = new CreateUserController(createUserUseCase);

  const { statusCode } = await createUserController.handle(req);

  return res.status(statusCode).send();
});

app.get("/user", async (req, res) => {
  const users = await userRepositoryInMemory.listUsers();
  return res.json(users);
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

app.listen(3333, () => {
  console.log("server is running");
});
