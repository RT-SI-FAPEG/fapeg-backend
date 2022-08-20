import { validateDate } from "../shared/utils/validate-date";
import { IDateValidate } from "../usecases/ports/validate-date";

export class DateValidator implements IDateValidate {
  validate(value: string): boolean {
    return validateDate(value);
  }
}
