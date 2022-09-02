import { IListUsersRepository } from "../../ports/list-users.repository";

interface ListUsersUseCaseProps {
  listUsersRepository: IListUsersRepository;
}

export class ListUsersUseCase {
  constructor(private props: ListUsersUseCaseProps) {}

  async exec() {
    return this.props.listUsersRepository.listUsers();
  }
}
