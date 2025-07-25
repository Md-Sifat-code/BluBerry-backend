import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}

    async sendEmail({ to, subject, message }: { to: string; subject: string; message: string | object }) {

        // Convert message to string if it's an object
        const emailBody = typeof message === 'object' ? JSON.stringify(message) : message;

        try {
            await this.mailerService.sendMail({
                to,
                subject,
                text: emailBody, 
            });
            return { success: true, message: 'Email sent successfully' };
        } catch (error) {
            console.error('Email sending failed:', error);
            throw new Error(`Email sending failed: ${error.message}`);
        }
    }
}
