import { AuthUserController } from "../../../adapters/controllers/auth-user.controller";
import { User } from "../../../entities/user.entity";
import { emailValidatorMock } from "../../mocks/email-validator.mock";
import { findUserByEmailRepositoryMock } from "../../mocks/find-user-by-email-repository.mock";
import { jwtCreatorMock } from "../../mocks/jwt-creator.mock";
import { passwordComparerMock } from "../../mocks/password-comparer.mock";
import { AuthUserDTO, AuthUserUseCase } from "./auth-user.usecase";

function makeSut() {
  const sut = new AuthUserUseCase({
    emailValidator: emailValidatorMock,
    findUserByEmailRepository: findUserByEmailRepositoryMock,
    jwtCreator: jwtCreatorMock,
    passwordComparer: passwordComparerMock,
  });

  return { sut };
}

interface IncomingData {
  email: string | undefined;
  password: string | undefined;
}

describe("Auth User Use Case", () => {
  it("Should be able to authenticate an user", async () => {
    const { sut } = makeSut();

    const data = { email: "mail", password: "password" };

    findUserByEmailRepositoryMock.findUserByEmail.mockResolvedValueOnce(
      {} as User
    );

    passwordComparerMock.compare.mockReturnValueOnce(true);

    const { id, token } = await sut.exec(data);

    expect(id).not.toBeNull();
    expect(token).not.toBeNull();
  });

  it("Should throws if invalid email is provided", () => {
    const { sut } = makeSut();

    expect(async () => {
      const data = { email: "mail", password: "password" };

      emailValidatorMock.validate.mockReturnValueOnce(false);

      await sut.exec(data);
    }).rejects.toThrow("Endereço de e-mail inválido");
  });

  it("Should throws if user not exists", () => {
    const { sut } = makeSut();

    expect(async () => {
      const data = { email: "mail", password: "password" };

      findUserByEmailRepositoryMock.findUserByEmail.mockResolvedValueOnce(
        undefined
      );

      await sut.exec(data);
    }).rejects.toThrow("E-mail ou senha inválidos");
  });

  it("Should throws if provided password not matches with user password", () => {
    const { sut } = makeSut();

    expect(async () => {
      const data = { email: "mail", password: "password" };

      findUserByEmailRepositoryMock.findUserByEmail.mockResolvedValueOnce(
        {} as User
      );

      passwordComparerMock.compare.mockReturnValueOnce(false);

      await sut.exec(data);
    }).rejects.toThrow("E-mail ou senha inválidos");
  });

  it("Should throws if email is not provided", () => {
    const { sut } = makeSut();

    expect(async () => {
      const data = { email: "", password: "password" };

      findUserByEmailRepositoryMock.findUserByEmail.mockResolvedValueOnce(
        {} as User
      );

      passwordComparerMock.compare.mockReturnValueOnce(false);

      await sut.exec(data);
    }).rejects.toThrow("E-mail e senha são obrigatórios");
  });

  it("Should throws if email is not provided", () => {
    const { sut } = makeSut();

    expect(async () => {
      const data = { email: "email", password: "" };

      findUserByEmailRepositoryMock.findUserByEmail.mockResolvedValueOnce(
        {} as User
      );

      passwordComparerMock.compare.mockReturnValueOnce(false);

      await sut.exec(data);
    }).rejects.toThrow("E-mail e senha são obrigatórios");
  });
});
