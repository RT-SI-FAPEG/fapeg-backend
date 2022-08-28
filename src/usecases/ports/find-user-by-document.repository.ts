import { User } from "../../entities/user.entity";

export interface IFindUserByDocument {
  findUserByDocument(document: string): Promise<User | undefined>;
}
