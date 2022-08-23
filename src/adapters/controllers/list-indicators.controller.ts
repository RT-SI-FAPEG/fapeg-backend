import { ListIndicatorsUseCase } from "../../usecases/list-indicators.usecase";
import { HttpResponse } from "./protocols/http";

export class ListIndicatorsController {
  constructor(private listIndicatorsUseCase: ListIndicatorsUseCase) {}
  async handle(): Promise<HttpResponse> {
    const result = this.listIndicatorsUseCase.exec();
    return {
      statusCode: 200,
      body: result,
    };
  }
}
