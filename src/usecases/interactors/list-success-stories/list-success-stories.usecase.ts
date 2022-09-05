import successStories from "../../../../casos_sucesso.json";

export class ListSuccessStoriesUseCase {
  exec() {
    return successStories;
  }
}
