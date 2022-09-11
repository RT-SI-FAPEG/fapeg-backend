import { AppError } from "../../../shared/errors/AppError";
import { createUserMailTemplate } from "../../../shared/utils/mail-templates/create-user.template";
import { IFindUserByEmailRepository } from "../../ports/find-user-by-email.repository";
import { IJwtCreator } from "../../ports/jwt-creator";
import { ISendMail } from "../../ports/send-mail";

interface ResendConfirmationMailProps {
  sendMail: ISendMail;
  findUserByIdRepository: IFindUserByEmailRepository;
  tokenGenerator: IJwtCreator;
}

export class ResendConfirmationMailUseCase {
  constructor(private props: ResendConfirmationMailProps) {}

  async exec(email: string) {
    if (!email) throw new AppError("Endereço de e-mail é obrigatório");

    const user = await this.props.findUserByIdRepository.findUserByEmail(email);

    if (!user)
      throw new AppError("Usuário não cadastrado em nossa base de dados");

    const token = this.props.tokenGenerator.create({
      exp: "1d",
      sub: user.id,
    });

    this.props.sendMail.sendMail({
      subject: "E-mail de confirmação de cadastro",
      to: user.email,
      text: createUserMailTemplate({
        token,
        mailAddress: user.email,
        name: user.name,
      }),
    });
  }
}
