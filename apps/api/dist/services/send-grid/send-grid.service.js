"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendGridService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const SendGrid = require("@sendgrid/mail");
const env_1 = require("../../config/env");
const Handlebars = require("handlebars");
const nodemailer = require("nodemailer");
let SendGridService = class SendGridService {
    constructor(configService) {
        this.configService = configService;
        if (env_1.IS_PRODUCTION) {
            SendGrid.setApiKey(this.configService.get("SEND_GRID_API_KEY"));
        }
    }
    async send(mail) {
        try {
            if (env_1.IS_DEVELOPMENT) {
                return this.sendEmailDevelopment(mail);
            }
            await SendGrid.send(mail);
            return true;
        }
        catch {
            return false;
        }
    }
    getHtml(template, variables) {
        const html = Handlebars.compile(template);
        return html(variables);
    }
    async sendEmailDevelopment(mail) {
        try {
            const transport = nodemailer.createTransport({
                port: 2500,
                secure: false,
                encoding: "utf-8",
            });
            const { to, subject, from, html } = mail;
            await transport.sendMail({
                to,
                subject,
                from,
                html,
            });
            return true;
        }
        catch {
            return false;
        }
    }
};
exports.SendGridService = SendGridService;
exports.SendGridService = SendGridService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], SendGridService);
//# sourceMappingURL=send-grid.service.js.map