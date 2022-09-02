import { DeleteUserUseCase } from "../../usecases/interactors/delete-user/delete-user.usecase";
import { HttpRequest, HttpResponse } from "./protocols/http";

export class DeleteUserController {
  constructor(private deleteUserUseCase: DeleteUserUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.params;

    await this.deleteUserUseCase.exec(id);

    return {
      statusCode: 204,
    };
  }
}
