import { Body, Controller, Post } from '@nestjs/common';
import { UserServiceService } from './user-service.service';
import { UserServiceDto } from './user-service-dto/user-service-dto';

@Controller('user-service')
export class UserServiceController {
  constructor(private readonly userServiceService: UserServiceService) {}

  @Post('create')
  async createService(@Body() serviceData: UserServiceDto) {
    return this.userServiceService.createService(serviceData);
  }
}
