export interface IPasswordComparer {
  compare(password: string, hash: string): boolean;
}
