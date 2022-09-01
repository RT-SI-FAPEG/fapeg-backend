export interface IDeleteUserRepository {
  deleteUser(userId: string): Promise<void>;
}
