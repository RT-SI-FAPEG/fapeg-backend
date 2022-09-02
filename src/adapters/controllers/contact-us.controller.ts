import { ContactUsUseCase } from "../../usecases/interactors/contact-us/contact-us.usecase";
import { HttpRequest, HttpResponse } from "./protocols/http";

export class ContactUsController {
  constructor(private contactUsUseCase: ContactUsUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { email, subject, text } = request.body;

    await this.contactUsUseCase.exec({ email, subject, text });

    return {
      statusCode: 200,
    };
  }
}
