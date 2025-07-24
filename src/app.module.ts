import { PrismaService } from 'src/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserServiceModule } from './user-service/user-service.module';
import { UserServiceController } from './user-service/user-service.controller';
import { UserServiceService } from './user-service/user-service.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    PrismaModule,
    UserServiceModule,
  ],
  controllers: [AppController, UserServiceController],
  providers: [PrismaService, AppService, UserServiceService],
})
export class AppModule {}
