export interface IUpdateUserPasswordRepository {
  updatePassword(userId: string, password: string): Promise<void>;
}
