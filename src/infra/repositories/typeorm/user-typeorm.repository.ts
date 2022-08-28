import { Repository } from "typeorm";
import { AppDataSource } from "../../../database";
import { UserEntity } from "../../../database/entities/User";
import { User } from "../../../entities/user.entity";
import { IFindUserByDocument } from "../../../usecases/ports/find-user-by-document.repository";
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
    IUpdateUserPasswordRepository,
    IFindUserByDocument
{
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(UserEntity);
  }

  async findUserByDocument(document: string): Promise<User | undefined> {
    const user = await this.repository.findOneBy({
      document,
    });

    return user || undefined;
  }

  async updatePassword(userId: string, password: string): Promise<void> {
    this.repository.update(
      { id: userId },
      {
        password,
      }
    );
  }

  async findUserById(id: string): Promise<User | undefined> {
    const user = await this.repository.findOneBy({ id });
    return user || undefined;
  }

  async listUsers(): Promise<User[]> {
    return this.repository.find({
      select: [
        "birthDate",
        "course",
        "document",
        "educationLevel",
        "educationalInstitution",
        "email",
        "id",
        "name",
        "typePerson",
      ],
    });
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findOneBy({ email });
    return user || undefined;
  }

  async saveUserRepository(user: User): Promise<void> {
    await this.repository.save(user);
  }
}
