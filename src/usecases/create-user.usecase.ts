import { TypePerson, User } from "../entities/user.entity";
import { AppError } from "../shared/errors/AppError";
import { ICPFValidator } from "./ports/cpf-validator";
import { IFindUserByEmailRepository } from "./ports/find-user-by-email.repository";
import { IPasswordHasher } from "./ports/password-hasher";
import { IPasswordValidator } from "./ports/password-validator";
import { ISaveUserRepository } from "./ports/save-user.repository";
import { ISendMail } from "./ports/send-mail";
import { IEmailValidator } from "./ports/user-validator";

export interface CreateUserDTO {
  name: string;
  birthDate: string;
  email: string;
  document: string;
  password: string;
  educationLevel?: string;
  educationalInstitution?: string;
  course?: string;
  typePerson: TypePerson;
}

interface CreateUserProps {
  passwordValidator: IPasswordValidator;
  emailValidator: IEmailValidator;
  passwordHasher: IPasswordHasher;
  sendMail: ISendMail;
  findUserRepository: IFindUserByEmailRepository;
  saveUserRepository: ISaveUserRepository;
  cpfValidator: ICPFValidator;
}

export class CreateUserUseCase {
  constructor(private props: CreateUserProps) {}

  async exec(data: CreateUserDTO) {
    const {
      birthDate,
      document,
      email,
      name,
      password,
      course,
      educationLevel,
      educationalInstitution,
      typePerson,
    } = data;

    if (
      document === undefined ||
      email === undefined ||
      name === undefined ||
      password === undefined
    )
      throw new AppError("All fields are required");

    if (!this.props.emailValidator.validate(email))
      throw new AppError("Invalid Email");

    if (!this.props.passwordValidator.validate(password))
      throw new AppError("Invalid Password");

    if (!this.props.cpfValidator.validate(document))
      throw new AppError("Invalid Password");

    if (name.length < 3) throw new AppError("Invalid Name");

    const userAlreadyExists =
      await this.props.findUserRepository.findUserByEmail(email);

    if (userAlreadyExists) throw new AppError("User already exists");

    const user = new User({
      birthDate,
      document,
      email,
      name,
      password: this.props.passwordHasher.encrypt(password),
      typePerson,
      course,
      educationLevel,
      educationalInstitution,
    });

    await this.props.saveUserRepository.saveUserRepository(user);

    await this.props.sendMail.sendMail("user created");
  }
}
