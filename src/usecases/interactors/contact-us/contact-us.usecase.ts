import { AppError } from "../../../shared/errors/AppError";
import { ISendMail } from "../../ports/send-mail";
import { IEmailValidator } from "../../ports/user-validator";

interface ContactUsUseCaseProps {
  sendMail: ISendMail;
  mailValidator: IEmailValidator;
}

interface ContactUsUseCaseDTO {
  email: string;
  subject: string;
  text: string;
}

export class ContactUsUseCase {
  constructor(private props: ContactUsUseCaseProps) {}

  async exec(data: ContactUsUseCaseDTO) {
    if (!data.email) throw new AppError("E-mail é obrigatório");
    if (!data.subject) throw new AppError("Assunto é obrigatório");
    if (!data.text) throw new AppError("Mensagem é obrigatória");

    if (!this.props.mailValidator.validate(data.email))
      throw new AppError("Endereço de e-mail inválido");

    this.props.sendMail.sendMail({
      subject: data.subject,
      text: data.text,
      to: data.email,
    });
  }
}
