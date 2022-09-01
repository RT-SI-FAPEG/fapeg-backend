import { Router } from "express";
import { ContactUsController } from "../../../../adapters/controllers/contact-user.controller";
import { SendMail } from "../../../../infra/send-mail";
import { ContactUsUseCase } from "../../../../usecases/interactors/contact-use.usecase";

export const contactRoutes = Router();

const sendMail = new SendMail();

contactRoutes.post("/contact", async (req, res) => {
  const contactUsUseCase = new ContactUsUseCase({ sendMail });
  const contactUsController = new ContactUsController(contactUsUseCase);
  const result = await contactUsController.handle(req);
  return res.status(result.statusCode).send("");
});
