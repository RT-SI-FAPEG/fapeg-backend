import { TypePerson, User } from "../../../entities/user.entity";
import { CreateUserDTO, CreateUserUseCase } from "./create-user.usecase";
import { cpfValidatorMock } from "../../mocks/cpf-validator.mock";
import { emailValidatorMock } from "../../mocks/email-validator.mock";
import { findUserByDocumentRepositoryMock } from "../../mocks/find-user-by-document-repository.mock";
import { findUserByEmailRepositoryMock } from "../../mocks/find-user-by-email-repository.mock";
import { passwordHasherMock } from "../../mocks/password-hasher.mock";
import { passwordValidatorMock } from "../../mocks/password-validator.mock";
import { saveUserRepositoryMock } from "../../mocks/save-user-repository.mock";
import { sendMailMock } from "../../mocks/send-mail.mock";
import { dateValidatorMock } from "../../mocks/validate-date.mock";
import { jwtCreatorMock } from "../../mocks/jwt-creator.mock";

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
    tokenGenerator: jwtCreatorMock,
  });

  return { createUserUseCase };
}

describe("Create User Use Case", () => {
  it("Should be able to create a new user", async () => {
    const { createUserUseCase } = makeSut();

    findUserByEmailRepositoryMock.findUserByEmail.mockResolvedValueOnce(
      undefined
    );

    findUserByDocumentRepositoryMock.findUserByDocument.mockResolvedValueOnce(
      undefined
    );

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
    }).rejects.toThrow("Data de nascimento inv??lida");
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
    }).rejects.toThrow("Formato de CPF inv??lido");
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
    }).rejects.toThrow("Endere??o de e-mail inv??lido");
  });

  it("Should throws if invalid name is provided", () => {
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
    }).rejects.toThrow("Nome inv??lido: deve possuir pelo menos 3 caracteres");
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
    }).rejects.toThrow("Formato de senha inv??lido");
  });

  it("Should throws if user already exists with e-mail address", () => {
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

      findUserByEmailRepositoryMock.findUserByEmail.mockResolvedValueOnce(
        {} as User
      );

      await createUserUseCase.exec(data as CreateUserDTO);
    }).rejects.toThrow(
      "Usu??rio j?? cadastrado em nossa base de dados com este endere??o de e-mail"
    );
  });

  it("Should throws if user already exists with document", () => {
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

      findUserByDocumentRepositoryMock.findUserByDocument.mockResolvedValueOnce(
        {} as User
      );

      await createUserUseCase.exec(data as CreateUserDTO);
    }).rejects.toThrow(
      "Usu??rio j?? cadastrado em nossa base de dados com este documento"
    );
  });
});
