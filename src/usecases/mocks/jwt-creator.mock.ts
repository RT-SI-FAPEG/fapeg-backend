import { IJwtCreator } from "../ports/jwt-creator";

export const jwtCreatorMock: jest.Mocked<IJwtCreator> = {
  create: jest.fn(),
};
