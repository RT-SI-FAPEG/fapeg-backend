import { User } from "../../entities/user.entity";

export interface ISaveUserRepository {
  saveUserRepository(user: User): Promise<void>;
}
