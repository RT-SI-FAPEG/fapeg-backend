import { emailValidatorMock } from "../../mocks/email-validator.mock";
import { sendMailMock } from "../../mocks/send-mail.mock";
import { ContactUsUseCase } from "./contact-us.usecase";

function makeSut() {
  const sut = new ContactUsUseCase({
    sendMail: sendMailMock,
    mailValidator: emailValidatorMock,
  });

  return { sut };
}

describe("Contact Us Use Case", () => {
  it("Should be able to send contact email", async () => {
    const data = {
      email: "any_mail",
      subject: "any_subject",
      text: "any_text",
    };

    const { sut } = makeSut();

    await sut.exec(data);
  });

  it("Should throws if email address is invalid", () => {
    const { sut } = makeSut();

    expect(async () => {
      const data = {
        email: "invalid_mail",
        subject: "any_subject",
        text: "any_text",
      };

      emailValidatorMock.validate.mockReturnValueOnce(false);

      await sut.exec(data);
    }).rejects.toThrow("Endereço de e-mail inválido");
  });

  it("Should throws if email is not provided", () => {
    const { sut } = makeSut();

    expect(async () => {
      const data = {
        email: "",
        subject: "any_subject",
        text: "any_text",
      };

      await sut.exec(data);
    }).rejects.toThrow("E-mail é obrigatório");
  });

  it("Should throws if subject is not provided", () => {
    const { sut } = makeSut();

    expect(async () => {
      const data = {
        email: "any_email",
        subject: "",
        text: "any_text",
      };

      await sut.exec(data);
    }).rejects.toThrow("Assunto é obrigatório");
  });

  it("Should throws if text is not provided", () => {
    const { sut } = makeSut();

    expect(async () => {
      const data = {
        email: "any_email",
        subject: "any_subject",
        text: "",
      };

      await sut.exec(data);
    }).rejects.toThrow("Mensagem é obrigatória");
  });
});
