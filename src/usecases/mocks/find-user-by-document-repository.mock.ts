import { IFindUserByDocument } from "../ports/find-user-by-document.repository";

export const findUserByDocumentRepositoryMock: jest.Mocked<IFindUserByDocument> =
  {
    findUserByDocument: jest.fn(),
  };
