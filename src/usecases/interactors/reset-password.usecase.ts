import { PasswordHasher } from "../../infra/password-hasher";
import { AppError } from "../../shared/errors/AppError";
import { IFindUserByIdRepository } from "../ports/find-user-by-id.repository";
import { IJwtDecoder } from "../ports/jwt-decoder";
import { IPasswordComparer } from "../ports/password-comparer";
import { IPasswordValidator } from "../ports/password-validator";
import { IUpdateUserPasswordRepository } from "../ports/update-user-password.repository";

interface ResetPasswordUseCaseProps {
  jwtDecoder: IJwtDecoder;
  passwordComparer: IPasswordComparer;
  passwordHasher: PasswordHasher;
  findUserByIdRepository: IFindUserByIdRepository;
  updateUserPasswordRepository: IUpdateUserPasswordRepository;
  passwordValidator: IPasswordValidator;
}

interface ResetPasswordUseCaseDTO {
  token: string;
  newPassword: string;
}

export class ResetPasswordUseCase {
  constructor(private props: ResetPasswordUseCaseProps) {}

  async exec({ newPassword, token }: ResetPasswordUseCaseDTO) {
    // verificar se tem a nova senha
    if (!newPassword) throw new AppError("Campo senha é obrigatório");

    // verificar se tem o token
    if (!token) throw new AppError("Token é obrigatório");

    // verificar se a nova senha é válida
    const isValidNewPassword =
      this.props.passwordValidator.validate(newPassword);

    if (!isValidNewPassword)
      throw new AppError("Nova senha possui formato inválido");

    // verificar se o token não está expirado
    const { exp, sub } = this.props.jwtDecoder.decode(token);

    // verificar se o usuário existe
    const user = await this.props.findUserByIdRepository.findUserById(sub);

    if (!user) throw new AppError("Usuário não encontrado");

    // verificar se a nova senha é diferente da anterior
    const passwordsAreEquals = this.props.passwordComparer.compare(
      newPassword,
      user.password
    );

    if (passwordsAreEquals)
      throw new AppError("A nova senha não pode ser igual à senha anterior");

    // fazer update da senha
    await this.props.updateUserPasswordRepository.updatePassword(
      user.id,
      this.props.passwordHasher.encrypt(newPassword)
    );

    // se o user existir, verificar se o id do token é igual ao id do user encontrado
  }
}
