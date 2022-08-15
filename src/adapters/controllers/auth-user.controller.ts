import { AuthUserUseCase } from "../../usecases/auth-user.usecase";
import { HttpRequest, HttpResponse } from "./protocols/http";

export class AuthUserController {
  constructor(private authUserUseCase: AuthUserUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { email, password } = request.body;

    const result = await this.authUserUseCase.execute({ email, password });

    return {
      statusCode: 200,
      body: result,
    };
  }
}
