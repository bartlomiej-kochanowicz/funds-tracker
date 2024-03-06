import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as SendGrid from "@sendgrid/mail";
import { IS_DEVELOPMENT, IS_PRODUCTION } from "@config/env";
import * as Handlebars from "handlebars";
import * as nodemailer from "nodemailer";

@Injectable()
export class SendGridService {
	constructor(private readonly configService: ConfigService) {
		if (IS_PRODUCTION) {
			SendGrid.setApiKey(this.configService.get<string>("SEND_GRID_API_KEY"));
		}
	}

	async send(mail: SendGrid.MailDataRequired): Promise<boolean> {
		try {
			if (IS_DEVELOPMENT) {
				return this.sendEmailDevelopment(mail);
			}

			await SendGrid.send(mail);

			return true;
		} catch {
			return false;
		}
	}

	getHtml(template: string, variables: unknown) {
		const html = Handlebars.compile(template);

		return html(variables);
	}

	private async sendEmailDevelopment(mail: SendGrid.MailDataRequired): Promise<boolean> {
		try {
			const transport = nodemailer.createTransport({
				// host: "127.0.0.1",
				port: 2500,
				secure: false,
				encoding: "utf-8",
			});

			const { to, subject, from, html } = mail as {
				to: string;
				subject: string;
				from: string;
				html: string;
			};

			await transport.sendMail({
				to,
				subject,
				from,
				html,
			});

			return true;
		} catch {
			return false;
		}
	}
}
