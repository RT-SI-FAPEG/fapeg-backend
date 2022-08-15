import { IPasswordValidator } from "../usecases/ports/password-validator";
import passwordValidator from "password-validator";

export class PasswordValidator implements IPasswordValidator {
  validate(value: string): boolean {
    var schema = new passwordValidator();

    schema
      .is()
      .min(8) // Minimum length 8
      .is()
      .max(100) // Maximum length 100
      .has()
      .uppercase() // Must have uppercase letters
      .has()
      .lowercase() // Must have lowercase letters
      .has()
      .digits() // Must have at least 2 digits
      .has()
      .not()
      .spaces();

    return schema.validate(value) as boolean;
  }
}
