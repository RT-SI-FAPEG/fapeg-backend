import { IPasswordComparer } from "../usecases/ports/password-comparer";
import {compareSync} from "bcryptjs"

export class PasswordComparer implements IPasswordComparer {
    compare(password: string, hash: string): boolean {
        return compareSync(password, hash);
    }
}