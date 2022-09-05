import { ListSuccessStoriesUseCase } from "../../usecases/interactors/list-success-stories/list-success-stories.usecase";
import { HttpResponse } from "./protocols/http";

export class ListSuccessStoriesController {
  constructor(private listSuccessStoriesUseCase: ListSuccessStoriesUseCase) {}
  async handle(): Promise<HttpResponse> {
    const result = this.listSuccessStoriesUseCase.exec();

    return {
      body: result,
      statusCode: 200,
    };
  }
}
