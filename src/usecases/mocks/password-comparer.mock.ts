import { IPasswordComparer } from "../ports/password-comparer";

export const passwordComparerMock: jest.Mocked<IPasswordComparer> = {
  compare: jest.fn(),
};
