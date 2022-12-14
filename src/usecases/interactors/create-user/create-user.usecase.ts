import { TypePerson, User } from "../../../entities/user.entity";
import { AppError } from "../../../shared/errors/AppError";
import { createUserMailTemplate } from "../../../shared/utils/mail-templates/create-user.template";
import { ICPFValidator } from "../../ports/cpf-validator";
import { IFindUserByDocument } from "../../ports/find-user-by-document.repository";
import { IFindUserByEmailRepository } from "../../ports/find-user-by-email.repository";
import { IJwtCreator } from "../../ports/jwt-creator";
import { IPasswordHasher } from "../../ports/password-hasher";
import { IPasswordValidator } from "../../ports/password-validator";
import { ISaveUserRepository } from "../../ports/save-user.repository";
import { ISendMail } from "../../ports/send-mail";
import { IEmailValidator } from "../../ports/user-validator";
import { IDateValidate } from "../../ports/validate-date";

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
  dateValidator: IDateValidate;
  findUserByDocument: IFindUserByDocument;
  tokenGenerator: IJwtCreator;
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

    if (document === undefined)
      throw new AppError("Campo documento é obrigatório");

    if (name === undefined) throw new AppError("Campo nome é obrigatório");

    if (email === undefined) throw new AppError("Campo e-mail é obrigatório");

    if (password === undefined) throw new AppError("Campo senha é obrigatório");

    if (birthDate === undefined)
      throw new AppError("Campo data de nascimento é obrigatório");

    if (typePerson === undefined)
      throw new AppError("Campo tipo de usuário é obrigatório");

    if (!this.props.emailValidator.validate(email))
      throw new AppError("Endereço de e-mail inválido");

    if (!this.props.passwordValidator.validate(password))
      throw new AppError("Formato de senha inválido");

    if (!this.props.cpfValidator.validate(document))
      throw new AppError("Formato de CPF inválido");

    if (!this.props.dateValidator.validate(birthDate))
      throw new AppError("Data de nascimento inválida");

    if (name.length < 3)
      throw new AppError("Nome inválido: deve possuir pelo menos 3 caracteres");

    const userAlreadyExistsWithEmailAddress =
      await this.props.findUserRepository.findUserByEmail(email);

    if (userAlreadyExistsWithEmailAddress)
      throw new AppError(
        "Usuário já cadastrado em nossa base de dados com este endereço de e-mail"
      );

    const userAlreadyExistsWithDocument =
      await this.props.findUserByDocument.findUserByDocument(document);

    if (userAlreadyExistsWithDocument)
      throw new AppError(
        "Usuário já cadastrado em nossa base de dados com este documento"
      );

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

    const token = this.props.tokenGenerator.create({
      exp: "1d",
      sub: user.id,
    });

    this.props.sendMail.sendMail({
      subject: "Conta criada",
      to: user.email,
      text: createUserMailTemplate({
        token,
        mailAddress: user.email,
        name: user.name,
      }),
    });
  }
}
