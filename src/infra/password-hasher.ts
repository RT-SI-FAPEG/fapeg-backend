import { IPasswordHasher } from "../usecases/ports/password-hasher";
import { hashSync } from "bcryptjs";

export class PasswordHasher implements IPasswordHasher {
  encrypt(value: string): string {
    return hashSync(value, 8);
  }
}
