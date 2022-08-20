import { ISendMail } from "../ports/send-mail";

export const sendMailMock: jest.Mocked<ISendMail> = {
  sendMail: jest.fn(),
};
