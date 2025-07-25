import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';


@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailService) {}

    @Get('send')
    async sendMail() {
        try {
            await this.mailService.sendEmail({
                to: 'habibhk127@gmail.com',
                subject: 'Test Email from NestJS',
                template: 'test-email', // Corresponds to test-email.pug in templates folder
                context: {
                    name: 'John Doe',
                    message: 'This is a test email sent from blue berry app using NestJS!'
                }
            });
            return { success: true, message: 'Email sent successfully!' };
        } catch (error) {
            return { 
                success: false, 
                message: 'Failed to send email',
                error: error.message 
            };
        }
    }
}
