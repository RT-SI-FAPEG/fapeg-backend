import { ListUsersUseCase } from "../../usecases/interactors/list-users/list-users.usecase";
import { HttpResponse } from "./protocols/http";

export class ListUsersController {
  constructor(private listUsersUseCase: ListUsersUseCase) {}

  async handle(): Promise<HttpResponse> {
    const result = await this.listUsersUseCase.exec();

    return {
      body: result,
      statusCode: 200,
    };
  }
}
