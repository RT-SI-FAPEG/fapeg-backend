export interface IPasswordDecrypter {
  decrypt(password: string): string;
}
