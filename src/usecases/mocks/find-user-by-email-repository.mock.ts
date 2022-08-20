import { IFindUserByEmailRepository } from "../ports/find-user-by-email.repository";
import { IFindUserByIdRepository } from "../ports/find-user-by-id.repository";

export const findUserByEmailRepositoryMock: jest.Mocked<IFindUserByEmailRepository> =
  {
    findUserByEmail: jest.fn(),
  };
