import { ICNPJValidator } from "../usecases/ports/cnpj-validator";
import { isCNPJ } from "brazilian-values";

export class CNPJValidator implements ICNPJValidator {
  validate(value: string): boolean {
    return isCNPJ(value);
  }
}
