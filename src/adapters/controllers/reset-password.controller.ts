import { ResetPasswordUseCase } from "../../usecases/interactors/reset-password/reset-password.usecase";
import { HttpRequest, HttpResponse } from "./protocols/http";

export class ResetPasswordController {
  constructor(private resetPasswordUseCase: ResetPasswordUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { newPassword, token } = request.body;

    await this.resetPasswordUseCase.exec({ newPassword, token });

    return {
      statusCode: 204,
    };
  }
}
