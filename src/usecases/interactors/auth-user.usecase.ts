import { AppError } from "../../shared/errors/AppError";
import { IFindUserByEmailRepository } from "../ports/find-user-by-email.repository";
import { IJwtCreator } from "../ports/jwt-creator";
import { IPasswordComparer } from "../ports/password-comparer";
import { IEmailValidator } from "../ports/user-validator";

interface AuthUserDTO {
  email: string;
  password: string;
}

interface AuthUserProps {
  emailValidator: IEmailValidator;
  findUserByEmailRepository: IFindUserByEmailRepository;
  passwordComparer: IPasswordComparer;
  jwtCreator: IJwtCreator;
}

export class AuthUserUseCase {
  constructor(private props: AuthUserProps) {}

  async execute({ email, password }: AuthUserDTO) {
    if (!email || !password)
      throw new AppError("E-mail e senha são obrigatórios");

    if (!this.props.emailValidator.validate(email))
      throw new AppError("Endereço de e-mail inválido");

    const user = await this.props.findUserByEmailRepository.findUserByEmail(
      email
    );

    if (!user) throw new AppError("E-mail ou senha inválidos");

    if (!this.props.passwordComparer.compare(password, user.password))
      throw new AppError("E-mail ou senha inválidos");

    const token = this.props.jwtCreator.create({
      exp: "1d",
      sub: user.id,
    });

    return {
      token,
    };
  }
}
