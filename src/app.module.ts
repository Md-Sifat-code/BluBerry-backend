import { PrismaService } from 'src/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mail/mail.module';
import { ItemModule } from './item/item.module';
import { UserModule } from './user/review.module';
import { UserServiceModule } from './user-service/user-service.module';

@Module({
  imports: [ConfigModule.forRoot({
     isGlobal: true   
    }),MailModule,ItemModule,UserModule,UserServiceModule],
  controllers: [AppController],
  providers: [AppService],


})
export class AppModule {}
