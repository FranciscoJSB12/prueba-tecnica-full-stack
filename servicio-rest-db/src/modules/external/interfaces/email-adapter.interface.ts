export interface IEmailAdapter {
  sendMail(token: string, email: string): Promise<void>;
}
