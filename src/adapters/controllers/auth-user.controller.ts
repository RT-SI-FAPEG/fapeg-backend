import { AuthUserUseCase } from "../../usecases/interactors/auth-user/auth-user.usecase";
import { HttpRequest, HttpResponse } from "./protocols/http";

export class AuthUserController {
  constructor(private authUserUseCase: AuthUserUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { email, password } = request.body;

    const result = await this.authUserUseCase.exec({ email, password });

    return {
      statusCode: 200,
      body: result,
    };
  }
}
