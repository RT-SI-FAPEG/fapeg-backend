import { User } from "../../entities/user.entity";

export interface IFindUserByIdRepository {
  findUserById(id: string): Promise<User | undefined>;
}
