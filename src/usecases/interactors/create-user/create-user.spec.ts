import { TypePerson } from "../../../entities/user.entity";
import { CreateUserDTO, CreateUserUseCase } from "../../create-user.usecase";
import { cpfValidatorMock } from "../../mocks/cpf-validator.mock";
import { emailValidatorMock } from "../../mocks/email-validator.mock";
import { findUserByEmailRepositoryMock } from "../../mocks/find-user-by-email-repository.mock";
import { passwordHasherMock } from "../../mocks/password-hasher.mock";
import { passwordValidatorMock } from "../../mocks/password-validator.mock";
import { saveUserRepositoryMock } from "../../mocks/save-user-repository.mock";
import { sendMailMock } from "../../mocks/send-mail.mock";

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
  });

  return { createUserUseCase };
}

describe("Create User Use Case", () => {
  it("Should be able to create a new user", async () => {
    const { createUserUseCase } = makeSut();

    await createUserUseCase.exec({
      birthDate: "2020-12-11",
      document: "162.564.910-09",
      email: "mail@mail.com",
      name: "Lucas",
      password: "Valid_password123",
      typePerson: "1",
    });
  });

  it("Should throws if required data is not provided", () => {
    const { createUserUseCase } = makeSut();

    expect(async () => {
      const data: IncomingData = {
        birthDate: "2020-12-11",
        document: "162.564.910-09",
        email: "mail@mail.com",
        name: "Lucas",
        password: "Valid_password123",
        typePerson: undefined,
      };
      await createUserUseCase.exec(data as CreateUserDTO);
    }).toThrow();
  });
});
