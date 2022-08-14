import { User } from "../../entities/user.entity";

export interface IListUsersRepository {
  listUsers(): Promise<User[]>;
}
