import { AppError } from "../../shared/errors/AppError";
import { ISendMail } from "../ports/send-mail";

interface ContactUsUseCaseProps {
  sendMail: ISendMail;
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

    this.props.sendMail.sendMail(JSON.stringify(data));
  }
}
