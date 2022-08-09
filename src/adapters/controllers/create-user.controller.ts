import { CreateUserUseCase } from "../../usecases/create-user.usecase";
import { HttpRequest, HttpResponse } from "./protocols/http";

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const {
      document,
      email,
      interestArea,
      name,
      password,
      typePerson,
      birthDate,
    } = request.body;

    await this.createUserUseCase.exec({
      document,
      email,
      interestArea,
      name,
      password,
      typePerson,
      birthDate,
    });

    return {
      statusCode: 201,
    };
  }
}
