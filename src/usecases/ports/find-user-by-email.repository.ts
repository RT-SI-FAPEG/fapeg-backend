import { User } from "../../entities/user.entity";

export interface IFindUserByEmailRepository {
  findUserByEmail(email: string): Promise<User | undefined>;
}
