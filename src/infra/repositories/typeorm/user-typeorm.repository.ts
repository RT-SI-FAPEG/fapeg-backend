import { Repository } from "typeorm";
import { AppDataSource } from "../../../database";
import { UserEntity } from "../../../database/entities/User";
import { User } from "../../../entities/user.entity";
import { IFindUserByEmailRepository } from "../../../usecases/ports/find-user-by-email.repository";
import { IFindUserByIdRepository } from "../../../usecases/ports/find-user-by-id.repository";
import { IListUsersRepository } from "../../../usecases/ports/list-users.repository";
import { ISaveUserRepository } from "../../../usecases/ports/save-user.repository";
import { IUpdateUserPasswordRepository } from "../../../usecases/ports/update-user-password.repository";

export class UserRepositoryTypeorm
  implements
    IFindUserByEmailRepository,
    ISaveUserRepository,
    IListUsersRepository,
    IFindUserByIdRepository,
    IUpdateUserPasswordRepository
{
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(UserEntity);
  }

  updatePassword(userId: string, password: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  findUserById(id: string): Promise<User | undefined> {
    throw new Error("Method not implemented.");
  }

  listUsers(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findOneBy({ email });
    return user || undefined;
  }

  async saveUserRepository(user: User): Promise<void> {
    await this.repository.save(user);
  }
}
