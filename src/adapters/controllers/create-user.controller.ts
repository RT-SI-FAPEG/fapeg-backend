import { CreateUserUseCase } from "../../usecases/interactors/create-user/create-user.usecase";
import { HttpRequest, HttpResponse } from "./protocols/http";

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const {
      document,
      email,
      name,
      password,
      typePerson,
      birthDate,
      course,
      educationalInstitution,
      educationLevel,
    } = request.body;

    await this.createUserUseCase.exec({
      document,
      email,
      name,
      password,
      typePerson,
      birthDate,
      course,
      educationalInstitution,
      educationLevel,
    });

    return {
      statusCode: 201,
    };
  }
}
