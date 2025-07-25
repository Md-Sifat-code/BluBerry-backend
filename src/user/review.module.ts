import { Module } from '@nestjs/common';
import { UserController } from './review.controller';
import { UserService } from './review.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
