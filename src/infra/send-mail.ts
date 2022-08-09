import { ISendMail } from "../usecases/ports/send-mail";

export class SendMail implements ISendMail {
  async sendMail(value: string): Promise<void> {
    console.log("email enviado...");
  }
}
