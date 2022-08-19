import { ListSearchesUseCase } from "../../usecases/list-searches.usecase";
import { HttpResponse } from "./protocols/http";

export class ListSearchesController {
  constructor(private listSearchesUseCase: ListSearchesUseCase) {}

  async handle(): Promise<HttpResponse> {
    const result = await this.listSearchesUseCase.exec();

    return {
      statusCode: 200,
      body: result,
    };
  }
}
