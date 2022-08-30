// pegar os dados anteriores do usuário (buscar por id)
// verificar se o e-mail foi alterado, se foi, verificar se não existe nenhum usuário com esse e-mail cadastrado
// verificar se o documento foi alterado, se foi, verificar se não existe nenhum usuário com esse documento cadastrado
// fazer todas as validações para e-mail, documento, data de nascimento, etc
// fazer o update do usuário no backend (criar repositório para isso)

import { TypePerson, User } from "../../entities/user.entity";
import { AppError } from "../../shared/errors/AppError";
import { ICPFValidator } from "../ports/cpf-validator";
import { IFindUserByDocument } from "../ports/find-user-by-document.repository";
import { IFindUserByEmailRepository } from "../ports/find-user-by-email.repository";
import { IFindUserByIdRepository } from "../ports/find-user-by-id.repository";
import { ISaveUserRepository } from "../ports/save-user.repository";
import { IUpdateUserRepository } from "../ports/udpate-user.repository";
import { IEmailValidator } from "../ports/user-validator";
import { IDateValidate } from "../ports/validate-date";

interface UpdateUserUseCaseDTO {
  id: string;
  name: string;
  birthDate: string;
  email: string;
  document: string;
  educationLevel?: string;
  educationalInstitution?: string;
  course?: string;
  typePerson: TypePerson;
}

interface UpdateUserUseCaseProps {
  emailValidator: IEmailValidator;
  findUserRepository: IFindUserByEmailRepository;
  saveUserRepository: ISaveUserRepository;
  cpfValidator: ICPFValidator;
  dateValidator: IDateValidate;
  findUserByDocument: IFindUserByDocument;
  findUserById: IFindUserByIdRepository;
  updateUserRepository: IUpdateUserRepository;
}

export class UpdateUserUseCase {
  constructor(private props: UpdateUserUseCaseProps) {}

  async exec(data: UpdateUserUseCaseDTO) {
    const {
      id,
      birthDate,
      document,
      email,
      name,
      course,
      educationLevel,
      educationalInstitution,
      typePerson,
    } = data;

    if (document === undefined)
      throw new AppError("Campo documento é obrigatório");

    if (name === undefined) throw new AppError("Campo nome é obrigatório");

    if (email === undefined) throw new AppError("Campo e-mail é obrigatório");

    if (birthDate === undefined)
      throw new AppError("Campo data de nascimento é obrigatório");

    if (typePerson === undefined)
      throw new AppError("Campo tipo de usuário é obrigatório");

    if (!this.props.emailValidator.validate(email))
      throw new AppError("Endereço de e-mail inválido");

    if (!this.props.cpfValidator.validate(document))
      throw new AppError("Formato de CPF inválido");

    if (!this.props.dateValidator.validate(birthDate))
      throw new AppError("Data de nascimento inválida");

    if (name.length < 3)
      throw new AppError("Nome inválido: deve possuir pelo menos 3 caracteres");

    const user = await this.props.findUserById.findUserById(id);

    if (!user)
      throw new AppError("Usuário não cadastrado em nossa base de dados");

    if (user.email !== email) {
      const userAlreadyExistsWithEmailAddress =
        await this.props.findUserRepository.findUserByEmail(email);

      if (userAlreadyExistsWithEmailAddress)
        throw new AppError(
          "Usuário já cadastrado em nossa base de dados com este endereço de e-mail"
        );
    }

    if (user.email !== email) {
      const userAlreadyExistsWithDocument =
        await this.props.findUserByDocument.findUserByDocument(document);

      if (userAlreadyExistsWithDocument)
        throw new AppError(
          "Usuário já cadastrado em nossa base de dados com este documento"
        );
    }

    const userToUpdate = new User({
      id,
      birthDate,
      document,
      email,
      name,
      password: user.password,
      typePerson,
      course,
      educationLevel,
      educationalInstitution,
    });

    const updatedUser = await this.props.updateUserRepository.updateUser(
      id,
      userToUpdate
    );

    return updatedUser.toJSON();
  }
}
