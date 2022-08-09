export interface ISendMail {
  sendMail(value: string): Promise<void>;
}
