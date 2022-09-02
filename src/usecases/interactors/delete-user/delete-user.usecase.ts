import { AppError } from "../../../shared/errors/AppError";
import { IDeleteUserRepository } from "../../ports/delete-user.repository";
import { IFindUserByIdRepository } from "../../ports/find-user-by-id.repository";

interface DeleteUserUseCaseProps {
  deleteUserRepository: IDeleteUserRepository;
  findUserByIdRepository: IFindUserByIdRepository;
}

export class DeleteUserUseCase {
  constructor(private props: DeleteUserUseCaseProps) {}

  async exec(userId: string) {
    if (!userId) throw new AppError("Id do usuário é obrigatório");

    const user = await this.props.findUserByIdRepository.findUserById(userId);

    if (!user) throw new AppError("Usuário não existe na base de dados");

    await this.props.deleteUserRepository.deleteUser(userId);
  }
}
