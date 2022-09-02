import { IFindUserByEmailRepository } from "../ports/find-user-by-email.repository";

export const findUserByEmailRepositoryMock: jest.Mocked<IFindUserByEmailRepository> =
  {
    findUserByEmail: jest.fn(),
  };
