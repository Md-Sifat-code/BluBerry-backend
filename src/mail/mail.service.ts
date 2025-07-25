import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendTestEmail() {
    try {
      await this.mailerService.sendMail({
        to: 'abireshan32@gmail.com',
        subject: 'Test Email from NestJS Mailer',
        template: 'test-email',
        context: {
          name: 'Test User',
          message: 'This is a test email sent from NestJS Mailer service'
        }
      });
      return { success: true };
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }

  async sendEmail(data: {
    to: string;
    subject: string;
    template: string;
    context: Record<string, any>;
  }) {
    try {
      await this.mailerService.sendMail({
        to: data.to,
        subject: data.subject,
        template: data.template,
        context: data.context
      });
      return { success: true };
    } catch (error) {
      console.error('Email sending failed:', error);
      throw new Error(`Email sending failed: ${error.message}`);
    }
  }
}
