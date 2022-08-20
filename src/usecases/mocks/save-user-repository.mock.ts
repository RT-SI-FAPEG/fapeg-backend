import { ISaveUserRepository } from "../ports/save-user.repository";

export const saveUserRepositoryMock: jest.Mocked<ISaveUserRepository> = {
  saveUserRepository: jest.fn().mockReturnValue(true),
};
