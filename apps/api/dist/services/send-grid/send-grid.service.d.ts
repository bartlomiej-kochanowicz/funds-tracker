import { ConfigService } from "@nestjs/config";
import * as SendGrid from "@sendgrid/mail";
export declare class SendGridService {
    private readonly configService;
    constructor(configService: ConfigService);
    send(mail: SendGrid.MailDataRequired): Promise<boolean>;
    getHtml(template: string, variables: unknown): string;
    private sendEmailDevelopment;
}
