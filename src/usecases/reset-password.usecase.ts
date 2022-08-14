import { AppError } from "../shared/errors/AppError";
import { IFindUserByIdRepository } from "./ports/find-user-by-id.repository";
import { IJwtDecoder } from "./ports/jwt-decoder";
import { IPasswordDecrypter } from "./ports/password-decrypter";
import { IUpdateUserPasswordRepository } from "./ports/update-user-password.repository";

interface ResetPasswordUseCaseProps {
  jwtDecoder: IJwtDecoder;
  passwordDecrypter: IPasswordDecrypter;
  findUserByIdRepository: IFindUserByIdRepository;
  updateUserPasswordRepository: IUpdateUserPasswordRepository;
}

interface ResetPasswordUseCaseDTO {
  token: string;
  newPassword: string;
}

export class ResetPasswordUseCase {
  constructor(private props: ResetPasswordUseCaseProps) {}

  async exec({ newPassword, token }: ResetPasswordUseCaseDTO) {
    // verificar se tem a nova senha
    if (!newPassword) throw new AppError("");

    // verificar se tem o token
    if (!token) throw new AppError("Token is missing");

    // verificar se o token não está expirado
    const { iat, sub } = this.props.jwtDecoder.decode(token);

    const expirationTime = new Date(iat).getTime();

    if (expirationTime < Date.now()) throw new AppError("Token Expired");

    // verificar se o cara existe
    const user = await this.props.findUserByIdRepository.findUserById(sub);

    if (!user) throw new AppError("User not finded");

    // verificar se a nova senha é diferente da anterior
    const oldPasswod = this.props.passwordDecrypter.decrypt(user.password);

    if (oldPasswod === newPassword)
      throw new AppError("A nova senha não pode ser igual à senha anterior");

    // fazer update da senha

    // se o user existir, verificar se o id do token é igual ao id do user encontrado
  }
}
