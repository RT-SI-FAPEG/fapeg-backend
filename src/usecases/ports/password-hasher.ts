export interface IPasswordHasher {
  encrypt(value: string): string;
}
