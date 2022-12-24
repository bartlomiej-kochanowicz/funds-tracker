import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';
import { IS_DEVELOPMENT } from 'common/config/env';
import * as Handlebars from 'handlebars';
import * as nodemailer from 'nodemailer';

@Injectable()
export class SendGridService {
  constructor(private readonly configService: ConfigService) {
    SendGrid.setApiKey(this.configService.get<string>('SEND_GRID_API_KEY'));
  }

  async send(mail: SendGrid.MailDataRequired) {
    if (IS_DEVELOPMENT) {
      return this.sendEmailDevelopment(mail);
    }

    const transporter = await SendGrid.send(mail);

    return transporter;
  }

  async sendEmailDevelopment(mail: SendGrid.MailDataRequired) {
    const transport = nodemailer.createTransport({
      host: 'mailslurper',
      port: 2500,
      secure: false,
    });

    const { to, subject, from, html } = mail as {
      to: string;
      subject: string;
      from: string;
      html: string;
    };

    const transporter = await transport.sendMail({
      to,
      subject,
      from,
      html,
    });

    return transporter;
  }

  getHtml(template: string, variables: unknown) {
    const html = Handlebars.compile(template);

    return html(variables);
  }
}
