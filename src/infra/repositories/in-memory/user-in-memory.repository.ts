import { User } from "../../../entities/user.entity";
import { IFindUserByEmailRepository } from "../../../usecases/ports/find-user-by-email.repository";
import { IFindUserByIdRepository } from "../../../usecases/ports/find-user-by-id.repository";
import { IListUsersRepository } from "../../../usecases/ports/list-users.repository";
import { ISaveUserRepository } from "../../../usecases/ports/save-user.repository";
import { IUpdateUserPasswordRepository } from "../../../usecases/ports/update-user-password.repository";

export class UserRepositoryInMemory
  implements
    IFindUserByEmailRepository,
    ISaveUserRepository,
    IListUsersRepository,
    IFindUserByIdRepository,
    IUpdateUserPasswordRepository
{
  private users: User[];
  static instance: UserRepositoryInMemory;

  private constructor() {
    this.users = [];
  }

  async updatePassword(userId: string, password: string): Promise<void> {
    const index = this.users.findIndex(user => user.id === userId)
    if(index) {
      this.users[index].password = password
    }
  }

  async findUserById(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id)
  }

  async listUsers(): Promise<User[]> {
    return this.users;
  }

  static getInstance() {
    if (!UserRepositoryInMemory.instance) {
      UserRepositoryInMemory.instance = new UserRepositoryInMemory();
    }

    return UserRepositoryInMemory.instance;
  }

  async saveUserRepository(user: User): Promise<void> {
    this.users.push(user);
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }
}
