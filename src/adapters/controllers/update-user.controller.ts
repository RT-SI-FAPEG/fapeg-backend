import { UpdateUserUseCase } from "../../usecases/interactors/update-user.usecase";
import { HttpRequest, HttpResponse } from "./protocols/http";

export class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const {
      birthDate,
      document,
      email,
      id,
      name,
      typePerson,
      course,
      educationalInstitution,
      educationLevel,
    } = request.body;

    const result = await this.updateUserUseCase.exec({
      birthDate,
      document,
      email,
      id,
      name,
      typePerson,
      course,
      educationalInstitution,
      educationLevel,
    });

    return {
      statusCode: 204,
      body: result,
    };
  }
}
