import { TypePerson, User } from "../entities/user.entity";
import { AppError } from "../shared/errors/AppError";
import { ICNPJValidator } from "./ports/cnpj-validator";
import { ICPFValidator } from "./ports/cpf-validator";
import { IFindUserByEmailRepository } from "./ports/find-user-by-email.repository";
import { IPasswordHasher } from "./ports/password-hasher";
import { IPasswordValidator } from "./ports/password-validator";
import { ISaveUserRepository } from "./ports/save-user.repository";
import { ISendMail } from "./ports/send-mail";
import { IEmailValidator } from "./ports/user-validator";

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  document: string;
  birthDate?: Date;
  interestArea: string;
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
  cnpjValidator: ICNPJValidator;
}

export class CreateUserUseCase {
  constructor(private props: CreateUserProps) {}

  async exec(data: CreateUserDTO) {
    const {
      birthDate,
      document,
      email,
      interestArea,
      name,
      password,
      typePerson,
    } = data;

    if (
      document === undefined ||
      email === undefined ||
      interestArea === undefined ||
      name === undefined ||
      password === undefined ||
      typePerson === undefined
    )
      throw new AppError("All fields are required");

    if (!this.props.emailValidator.validate(email))
      throw new AppError("Invalid Email");

    if (!this.props.passwordValidator.validate(password))
      throw new AppError("Invalid Password");

    if (typePerson === 1 && !birthDate)
      throw new AppError("Birth Date is a required field");

    if (name.length < 3) throw new AppError("Invalid Name");

    if (typePerson === 1 && !this.props.cpfValidator.validate(document))
      throw new AppError("Invalid Document");

    if (typePerson === 2 && !this.props.cnpjValidator.validate(document))
      throw new AppError("Invalid Document");

    const userAlreadyExists =
      await this.props.findUserRepository.findUserByEmail(email);

    if (userAlreadyExists) throw new AppError("User already exists");

    const user = new User({
      birthDate,
      document,
      email,
      interestArea,
      name,
      password,
      typePerson,
    });

    await this.props.saveUserRepository.saveUserRepository(user);

    await this.props.sendMail.sendMail("user created");
  }
}
