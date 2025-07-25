import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailService) {}

    @Post('send') 
    async sendMail(@Body() body: { message: string, email: string, name: string }) {
        try {
            await this.mailService.sendEmail({
                to: 'abireshan32@gmail.com',
                subject: 'Test Email from NestJS',
                message:`${body.message} \n\nFrom: ${body.name} <${body.email}>`
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
