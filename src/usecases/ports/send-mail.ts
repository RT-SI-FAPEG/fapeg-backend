export interface IDataEmail {
  to: string;
  subject: string;
  text: string;
}

export interface ISendMail {
  sendMail(data: IDataEmail): Promise<void>;
}
