import { ResendConfirmationMailUseCase } from "../../usecases/interactors/resend-confirmation-mail/resend-confirmation-mail.usecase";
import { HttpRequest, HttpResponse } from "./protocols/http";

export class ResendConfirmationMailController {
  constructor(
    private resendConfirmationMailUseCase: ResendConfirmationMailUseCase
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { email } = request.body;

    await this.resendConfirmationMailUseCase.exec(email);

    return {
      statusCode: 200,
    };
  }
}
