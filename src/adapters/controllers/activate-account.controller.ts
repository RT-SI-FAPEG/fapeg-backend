import { ActivateAccountUseCase } from "../../usecases/interactors/activate-account/activate-account.usecase";
import { HttpRequest, HttpResponse } from "./protocols/http";

export class ActivateAccountController {
  constructor(private activateAccountUseCase: ActivateAccountUseCase) {}
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { token } = request.body;

    await this.activateAccountUseCase.exec(token);

    return {
      statusCode: 200,
    };
  }
}
