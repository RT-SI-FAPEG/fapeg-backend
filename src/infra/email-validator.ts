import { IEmailValidator } from "../usecases/ports/user-validator";
import validator from "validator";

export class EmailValidator implements IEmailValidator {
  validate(value: string): boolean {
    return validator.isEmail(value);
  }
}
