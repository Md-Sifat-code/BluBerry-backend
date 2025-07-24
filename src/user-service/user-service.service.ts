import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserServiceDto } from './user-service-dto/user-service-dto';

@Injectable()
export class UserServiceService {
  constructor(private prisma: PrismaService) {}
  async createService(
    serviceData: Prisma.UserServiceCreateInput,
  ): Promise<UserServiceDto> {
    const result = await (this.prisma as PrismaClient).userService.create({
      data: serviceData,
    });
    return result as UserServiceDto;
  }
}
