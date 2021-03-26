import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';

interface IMail {
  to: string;
  subject: string;
  variables: object;
  templatePath: string;
  filePath?: string;
}

class MailService {
  private transporter: Transporter;

  private sender = process.env.EMAIL_USER;

  private senderPassword = process.env.EMAIL_PASSWORD;

  constructor() {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // smtp-relay.gmail.com
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: this.sender,
        pass: this.senderPassword,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    this.transporter = transporter;
  }

  public async execute({
    to,
    subject,
    variables,
    templatePath,
    filePath,
  }: IMail) {
    const templateFileContent = fs.readFileSync(templatePath).toString('utf8');
    const mailTemplateParse = handlebars.compile(templateFileContent);
    const html = mailTemplateParse(variables);

    const mailInfos = {
      to,
      subject,
      html,
      from: 'Focus Cursinho <focus@associacaopaideia.org.br>',
      attachments: null,
    };

    if (filePath) {
      mailInfos.attachments = { path: filePath };
    } else {
      delete mailInfos.attachments;
    }

    await this.transporter.sendMail(mailInfos);
  }
}

export default MailService;
