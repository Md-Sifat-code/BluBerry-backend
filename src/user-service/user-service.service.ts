import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserServiceDto } from './user-service-dto/user-service-dto';

@Injectable()
export class UserServiceService {
  constructor(private prisma: PrismaService) {}
  async getAllServices(): Promise<UserServiceDto[]> {
    const services = await (this.prisma as PrismaClient).userService.findMany();
    return services as UserServiceDto[];
  }

  async getServiceById(id: number): Promise<UserServiceDto | null> {
    const service = await (this.prisma as PrismaClient).userService.findUnique({
      where: { id },
    });
    return service as UserServiceDto | null;
  }

  async createService(
    serviceData: Prisma.UserServiceCreateInput,
  ): Promise<UserServiceDto> {
    const result = await (this.prisma as PrismaClient).userService.create({
      data: serviceData,
    });
    return result as UserServiceDto;
  }

  async deleteService(id: number): Promise<void> {
    await (this.prisma as PrismaClient).userService.delete({
      where: { id },
    });
  }
}
