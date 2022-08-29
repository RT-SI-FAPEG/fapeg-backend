import { ListSearchesUseCase } from "../../usecases/list-searches.usecase";
import { HttpRequest, HttpResponse } from "./protocols/http";

export class ListSearchesController {
  constructor(private listSearchesUseCase: ListSearchesUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { page, perPage } = request.query;

    const result = await this.listSearchesUseCase.exec({
      page: Number(page),
      perPage: Number(perPage),
    });

    return {
      statusCode: 200,
      body: result,
    };
  }
}
