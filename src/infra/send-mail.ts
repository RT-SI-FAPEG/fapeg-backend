import { IDataEmail, ISendMail } from "../usecases/ports/send-mail";
import { createTransport } from "nodemailer";

export class SendMail implements ISendMail {
  async sendMail(data: IDataEmail): Promise<void> {
    let transporter = createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_ADDRESS, // generated ethereal user
        pass: process.env.MAIL_PASSWORD, // generated ethereal password
      },
    });

    let info = await transporter.sendMail({
      from: '"Observatório FAPEG" <observatorio.fapeg@gmail.com>', // sender address
      to: data.to, // list of receivers
      subject: data.subject, // Subject line
      text: data.text, // plain text body
      html: data.text, // html body
    });

    console.log("Message sent: %s", info.messageId);
  }
}
