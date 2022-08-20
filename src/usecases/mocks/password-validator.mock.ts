import { IPasswordValidator } from "../ports/password-validator";

export const passwordValidatorMock: jest.Mocked<IPasswordValidator> = {
  validate: jest.fn().mockReturnValue(true),
};
