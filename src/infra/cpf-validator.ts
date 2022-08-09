import { ICPFValidator } from "../usecases/ports/cpf-validator";
import { isCPF } from "brazilian-values";

export class CPFValidator implements ICPFValidator {
  validate(value: string): boolean {
    return isCPF(value);
  }
}
