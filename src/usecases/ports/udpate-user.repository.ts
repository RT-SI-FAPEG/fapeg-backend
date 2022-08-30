import { User } from "../../entities/user.entity";

export interface IUpdateUserRepository {
  updateUser(userId: string, user: User): Promise<User>;
}
