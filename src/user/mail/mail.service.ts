// Misalnya ini library punya orang, sehingga ga bisa ditambahin @Injectable
export class MailService {
  send() {
    console.info('Send email');
  }
}

export const mailService = new MailService();
