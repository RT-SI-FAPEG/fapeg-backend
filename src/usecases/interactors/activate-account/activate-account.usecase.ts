import { User } from "../../../entities/user.entity";
import { AppError } from "../../../shared/errors/AppError";
import { IFindUserByIdRepository } from "../../ports/find-user-by-id.repository";
import { IJwtDecoder } from "../../ports/jwt-decoder";
import { IUpdateUserRepository } from "../../ports/udpate-user.repository";

interface ActivateAccountUseCaseProps {
  tokenValidator: IJwtDecoder;
  findUserByIdRepository: IFindUserByIdRepository;
  updateUserRepository: IUpdateUserRepository;
}

export class ActivateAccountUseCase {
  constructor(private props: ActivateAccountUseCaseProps) {}

  async exec(token: string) {
    if (!token) throw new AppError("Token é obrigatório");
    const { sub } = this.props.tokenValidator.decode(token);

    if (!sub)
      throw new AppError("Token inválido, tente novamente com um token válido");

    const user = await this.props.findUserByIdRepository.findUserById(sub);

    if (!user)
      throw new AppError(
        "Usuário não encontrado, tente novamente com um usuário válido"
      );

    const userToUpdate = new User({
      birthDate: user.birthDate,
      document: user.document,
      email: user.email,
      name: user.name,
      password: user.password,
      typePerson: user.typePerson,
      course: user.course,
      educationalInstitution: user.educationalInstitution,
      educationLevel: user.educationLevel,
      id: user.id,
      isActive: true,
    });

    await this.props.updateUserRepository.updateUser(sub, userToUpdate);
  }
}
