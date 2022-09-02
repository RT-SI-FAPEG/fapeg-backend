import { Router } from "express";
import { ContactUsController } from "../../../../adapters/controllers/contact-us.controller";
import { EmailValidator } from "../../../../infra/email-validator";
import { SendMail } from "../../../../infra/send-mail";
import { ContactUsUseCase } from "../../../../usecases/interactors/contact-us/contact-us.usecase";

export const contactRoutes = Router();

const sendMail = new SendMail();
const mailValidator = new EmailValidator();

contactRoutes.post("/contact", async (req, res) => {
  const contactUsUseCase = new ContactUsUseCase({ sendMail, mailValidator });

  const contactUsController = new ContactUsController(contactUsUseCase);

  const result = await contactUsController.handle(req);

  return res.status(result.statusCode).send("");
});
