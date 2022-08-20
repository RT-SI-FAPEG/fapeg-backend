import { IDateValidate } from "../ports/validate-date";

export const dateValidatorMock: jest.Mocked<IDateValidate> = {
  validate: jest.fn().mockReturnValue(true),
};
