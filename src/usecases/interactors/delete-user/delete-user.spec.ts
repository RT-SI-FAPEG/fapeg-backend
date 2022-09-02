import { User } from "../../../entities/user.entity";
import { deleteUserRepositoryMock } from "../../mocks/deleteUserRepository.mock";
import { findUserByIdRepositoryMock } from "../../mocks/find-user-by-id-repository.mock";
import { DeleteUserUseCase } from "./delete-user.usecase";

function makeSut() {
  const sut = new DeleteUserUseCase({
    deleteUserRepository: deleteUserRepositoryMock,
    findUserByIdRepository: findUserByIdRepositoryMock,
  });

  return { sut };
}

describe("Delete User Use Case", () => {
  it("Should be able to delete a user", async () => {
    const { sut } = makeSut();

    findUserByIdRepositoryMock.findUserById.mockResolvedValueOnce({} as User);

    const userId = "any_id";

    await sut.exec(userId);
  });

  it("Should throws if user id is not provided", async () => {
    const { sut } = makeSut();

    const userId = "";

    expect(async () => {
      await sut.exec(userId);
    }).rejects.toThrow("Id do usuário é obrigatório");
  });

  it("Should throws if user not exists", async () => {
    const { sut } = makeSut();

    const userId = "any_id";

    expect(async () => {
      findUserByIdRepositoryMock.findUserById.mockResolvedValueOnce(undefined);

      await sut.exec(userId);
    }).rejects.toThrow("Usuário não existe na base de dados");
  });
});
