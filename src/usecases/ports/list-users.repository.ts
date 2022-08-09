import { User } from "../../entities/user.entity";

export interface IListUsers {
  listUsers(): Promise<User[]>;
}
