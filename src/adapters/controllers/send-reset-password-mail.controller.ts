import { SendResetPasswordMailUseCase } from "../../usecases/interactors/send-reset-password-mail/send-reset-password-mail.usecase";
import { HttpRequest, HttpResponse } from "./protocols/http";

export class SendResetPasswordMailController {
  constructor(
    private sendResetPasswordMailUseCase: SendResetPasswordMailUseCase
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { email } = request.body;

    await this.sendResetPasswordMailUseCase.exec(email);

    return {
      statusCode: 201,
    };
  }
}
