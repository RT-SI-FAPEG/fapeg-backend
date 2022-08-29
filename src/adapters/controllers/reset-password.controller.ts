import { ResetPasswordUseCase } from "../../usecases/reset-password.usecase";
import { HttpRequest, HttpResponse } from "./protocols/http";

export class ResetPasswordController {
  constructor(private resetPasswordUseCase: ResetPasswordUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { newPassword } = request.body;
    const { token } = request.headers;

    await this.resetPasswordUseCase.exec({ newPassword, token });

    return {
      statusCode: 204,
    };
  }
}
