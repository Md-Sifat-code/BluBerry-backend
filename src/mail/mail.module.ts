import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';

import { MailController } from './mail.controller';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'alecgold808@gmail.com',
          pass: 'omuaicexgtfydfxf',
        },
      },
      defaults: {
        from: `alecgold808@gmail.com`,
      },
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
