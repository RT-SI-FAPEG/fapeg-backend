import { IDeleteUserRepository } from "../ports/delete-user.repository";

export const deleteUserRepositoryMock: jest.Mocked<IDeleteUserRepository> = {
  deleteUser: jest.fn(),
};
