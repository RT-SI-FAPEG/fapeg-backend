import { IPasswordHasher } from "../ports/password-hasher";

export const passwordHasherMock: jest.Mocked<IPasswordHasher> = {
  encrypt: jest.fn(),
};
