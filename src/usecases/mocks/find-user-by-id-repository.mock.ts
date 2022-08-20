import { IFindUserByIdRepository } from "../ports/find-user-by-id.repository";

export const findUserByIdRepositoryMock: jest.Mocked<IFindUserByIdRepository> =
  {
    findUserById: jest.fn(),
  };
