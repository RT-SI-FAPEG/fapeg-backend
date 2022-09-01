import { IDeleteUserRepository } from "../ports/delete-user.repository";

interface DeleteUserUseCaseProps {
  deleteUserRepository: IDeleteUserRepository;
}

export class DeleteUserUseCase {
  constructor(private props: DeleteUserUseCaseProps) {}

  async exec(userId: string) {
    await this.props.deleteUserRepository.deleteUser(userId);
  }
}
