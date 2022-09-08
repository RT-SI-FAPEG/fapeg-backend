import { ListSearchesUseCase } from "../../usecases/interactors/list-searches/list-searches.usecase";
import { HttpRequest, HttpResponse } from "./protocols/http";

export class ListSearchesController {
  constructor(private listSearchesUseCase: ListSearchesUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { page, perPage } = request.query;
    const { filter } = request.body;

    const result = await this.listSearchesUseCase.exec({
      page: Number(page),
      perPage: Number(perPage),
      filter,
    });

    return {
      statusCode: 200,
      body: result,
    };
  }
}
