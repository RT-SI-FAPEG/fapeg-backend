import { GetUserDataUseCase } from "../../usecases/interactors/get-user-data/get-user-data.usecase";
import { HttpRequest, HttpResponse } from "./protocols/http";

export class GetUserDataController {
  constructor(private getUserDataUseCase: GetUserDataUseCase) {}
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.params;

    const result = await this.getUserDataUseCase.exec(id);

    return {
      statusCode: 200,
      body: result,
    };
  }
}
