import { AppError } from "../../../shared/errors/AppError";
import { resetPasswordTemplate } from "../../../shared/utils/mail-templates/reset-password.template";
import { IFindUserByEmailRepository } from "../../ports/find-user-by-email.repository";
import { IJwtCreator } from "../../ports/jwt-creator";
import { ISendMail } from "../../ports/send-mail";

interface SendResetPasswordMailUseCaseProps {
  sendMail: ISendMail;
  findUserByIdRepository: IFindUserByEmailRepository;
  tokenGenerator: IJwtCreator;
}

export class SendResetPasswordMailUseCase {
  constructor(private props: SendResetPasswordMailUseCaseProps) {}
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
      subject: "E-mail de recuperação de senha",
      to: user.email,
      text: resetPasswordTemplate({
        token,
        mailAddress: user.email,
        name: user.name,
      }),
    });
  }
}
