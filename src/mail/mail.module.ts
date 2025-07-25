import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host:  'smtp.gmail.com',  
        port:  587,     
        secure: false,                                 
        auth: {
          user: 'dev.milonhossain32@gmail.com',
          pass: 'tcfaikiprsinmvcw',
        },
      },
      defaults: {
        from: `dev.milonhossain332@gmail.com`,
      },
      // template: {
      //   dir: __dirname + '../src../mail/templates',
      //   adapter: new PugAdapter(),
      //   options: {
      //     strict: true,
      //   },
      // },
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
