import { IEmailValidator } from "../ports/user-validator";

export const emailValidatorMock: jest.Mocked<IEmailValidator> = {
  validate: jest.fn().mockReturnValue(true),
};
