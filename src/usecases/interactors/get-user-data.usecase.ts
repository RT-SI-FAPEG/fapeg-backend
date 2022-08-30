import { User } from "../../entities/user.entity";
import { IFindUserByIdRepository } from "../ports/find-user-by-id.repository";

interface GetUserDataUseCaseProps {
  findUserByIdRepository: IFindUserByIdRepository;
}

export class GetUserDataUseCase {
  constructor(private props: GetUserDataUseCaseProps) {}

  async exec(id: string): Promise<User | undefined> {
    return this.props.findUserByIdRepository.findUserById(id);
  }
}
