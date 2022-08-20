import { ICPFValidator } from "../ports/cpf-validator";

export const cpfValidatorMock: jest.Mocked<ICPFValidator> = {
  validate: jest.fn().mockReturnValue(true),
};
