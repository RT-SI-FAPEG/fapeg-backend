import { TypePerson, User } from "../../../entities/user.entity";
import { CreateUserDTO, CreateUserUseCase } from "../../create-user.usecase";
import { cpfValidatorMock } from "../../mocks/cpf-validator.mock";
import { emailValidatorMock } from "../../mocks/email-validator.mock";
import { findUserByDocumentRepositoryMock } from "../../mocks/find-user-by-document-repository.mock";
import { findUserByEmailRepositoryMock } from "../../mocks/find-user-by-email-repository.mock";
import { passwordHasherMock } from "../../mocks/password-hasher.mock";
import { passwordValidatorMock } from "../../mocks/password-validator.mock";
import { saveUserRepositoryMock } from "../../mocks/save-user-repository.mock";
import { sendMailMock } from "../../mocks/send-mail.mock";
import { dateValidatorMock } from "../../mocks/validate-date.mock";

interface IncomingData {
  name: string | undefined;
  birthDate: string | undefined;
  email: string | undefined;
  document: string | undefined;
  password: string | undefined;
  educationLevel?: string | undefined;
  educationalInstitution?: string | undefined;
  course?: string | undefined;
  typePerson: TypePerson | undefined;
}

function makeSut() {
  const createUserUseCase = new CreateUserUseCase({
    cpfValidator: cpfValidatorMock,
    emailValidator: emailValidatorMock,
    findUserRepository: findUserByEmailRepositoryMock,
    passwordHasher: passwordHasherMock,
    passwordValidator: passwordValidatorMock,
    saveUserRepository: saveUserRepositoryMock,
    sendMail: sendMailMock,
    dateValidator: dateValidatorMock,
    findUserByDocument: findUserByDocumentRepositoryMock,
  });

  return { createUserUseCase };
}

describe("Create User Use Case", () => {
  it("Should be able to create a new user", async () => {
    const { createUserUseCase } = makeSut();

    await createUserUseCase.exec({
      birthDate: "2020-12-11",
      document: "any_document",
      email: "any_email",
      name: "any_name",
      password: "any_password",
      typePerson: "1",
    });
  });

  it("Should throws if type person is not provided", () => {
    const { createUserUseCase } = makeSut();

    expect(async () => {
      const data: IncomingData = {
        birthDate: "2020-12-11",
        document: "any_document",
        email: "any_email",
        name: "any_name",
        password: "any_password",
        typePerson: undefined,
      };
      await createUserUseCase.exec(data as CreateUserDTO);
    }).rejects.toThrow();
  });

  it("Should throws if password is not provided", () => {
    const { createUserUseCase } = makeSut();

    expect(async () => {
      const data: IncomingData = {
        birthDate: "any_birthDate",
        document: "any_document",
        email: "any_email",
        name: "any_name",
        password: undefined,
        typePerson: "1",
      };
      await createUserUseCase.exec(data as CreateUserDTO);
    }).rejects.toThrow();
  });

  it("Should throws if name is not provided", () => {
    const { createUserUseCase } = makeSut();

    expect(async () => {
      const data: IncomingData = {
        birthDate: "2020-12-11",
        document: "any_document",
        email: "any_email",
        name: undefined,
        password: "any_password",
        typePerson: "1",
      };
      await createUserUseCase.exec(data as CreateUserDTO);
    }).rejects.toThrow();
  });

  it("Should throws if email is not provided", () => {
    const { createUserUseCase } = makeSut();

    expect(async () => {
      const data: IncomingData = {
        birthDate: "2020-12-11",
        document: "any_document",
        email: undefined,
        name: "any_name",
        password: "any_password",
        typePerson: "1",
      };
      await createUserUseCase.exec(data as CreateUserDTO);
    }).rejects.toThrow();
  });

  it("Should throws if document is not provided", () => {
    const { createUserUseCase } = makeSut();

    expect(async () => {
      const data: IncomingData = {
        birthDate: "2020-12-11",
        document: undefined,
        email: "any_email",
        name: "any_name",
        password: "any_password",
        typePerson: "1",
      };
      await createUserUseCase.exec(data as CreateUserDTO);
    }).rejects.toThrow();
  });

  it("Should throws if birthDate is not provided", () => {
    const { createUserUseCase } = makeSut();

    expect(async () => {
      const data: IncomingData = {
        birthDate: undefined,
        document: "any_document",
        email: "any_email",
        name: "any_name",
        password: "any_password",
        typePerson: "1",
      };
      await createUserUseCase.exec(data as CreateUserDTO);
    }).rejects.toThrow();
  });

  it("Should throws if invalid birthDate is provided", () => {
    const { createUserUseCase } = makeSut();

    expect(async () => {
      const data: IncomingData = {
        birthDate: "invalid_birthDate",
        document: "any_document",
        email: "any_email",
        name: "any_name",
        password: "any_password",
        typePerson: "1",
      };

      dateValidatorMock.validate.mockReturnValueOnce(false);

      await createUserUseCase.exec(data as CreateUserDTO);
    }).rejects.toThrow("Data de nascimento inválida");
  });

  it("Should throws if invalid document is provided", () => {
    const { createUserUseCase } = makeSut();

    expect(async () => {
      const data: IncomingData = {
        birthDate: "any_birthDate",
        document: "invalid_document",
        email: "any_email",
        name: "any_name",
        password: "any_password",
        typePerson: "1",
      };

      cpfValidatorMock.validate.mockReturnValueOnce(false);

      await createUserUseCase.exec(data as CreateUserDTO);
    }).rejects.toThrow("Formato de CPF inválido");
  });

  it("Should throws if invalid email is provided", () => {
    const { createUserUseCase } = makeSut();

    expect(async () => {
      const data: IncomingData = {
        birthDate: "any_birthDate",
        document: "any_document",
        email: "invalid_email",
        name: "any_name",
        password: "any_password",
        typePerson: "1",
      };

      emailValidatorMock.validate.mockReturnValueOnce(false);

      await createUserUseCase.exec(data as CreateUserDTO);
    }).rejects.toThrow("Endereço de e-mail inválido");
  });

  it("Should throws if invalid email is provided", () => {
    const { createUserUseCase } = makeSut();

    expect(async () => {
      const data: IncomingData = {
        birthDate: "any_birthDate",
        document: "any_document",
        email: "any_email",
        name: "as",
        password: "any_password",
        typePerson: "1",
      };

      await createUserUseCase.exec(data as CreateUserDTO);
    }).rejects.toThrow("Nome inválido: deve possuir pelo menos 3 caracteres");
  });

  it("Should throws if invalid password is provided", () => {
    const { createUserUseCase } = makeSut();

    expect(async () => {
      const data: IncomingData = {
        birthDate: "any_birthDate",
        document: "any_document",
        email: "any_email",
        name: "any_name",
        password: "invalid_password",
        typePerson: "1",
      };

      passwordValidatorMock.validate.mockReturnValueOnce(false);

      await createUserUseCase.exec(data as CreateUserDTO);
    }).rejects.toThrow("Formato de senha inválido");
  });

  it("Should throws if user already exists", () => {
    const { createUserUseCase } = makeSut();

    expect(async () => {
      const data: IncomingData = {
        birthDate: "any_birthDate",
        document: "any_document",
        email: "any_email",
        name: "any_name",
        password: "any_password",
        typePerson: "1",
      };

      findUserByEmailRepositoryMock.findUserByEmail.mockResolvedValue(
        {} as User
      );

      await createUserUseCase.exec(data as CreateUserDTO);
    }).rejects.toThrow("Usuário já cadastrado em nossa base de dados");
  });
});
