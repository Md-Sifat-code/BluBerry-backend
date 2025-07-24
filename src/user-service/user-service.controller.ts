import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserServiceService } from './user-service.service';
import { UserServiceDto } from './user-service-dto/user-service-dto';

@Controller('user-service')
export class UserServiceController {
  constructor(private readonly userServiceService: UserServiceService) {}

  @Get()
  async getAllServices() {
    return this.userServiceService.getAllServices();
  }

  @Get(':id')
  async getServiceById(@Param('id') id: number) {
    return this.userServiceService.getServiceById(+id);
  }

  @Post('create')
  async createService(@Body() serviceData: UserServiceDto) {
    return this.userServiceService.createService(serviceData);
  }

  @Delete(':id')
  async deleteService(@Param('id') id: number) {
    const service = await this.userServiceService.getServiceById(+id);
    if (!service) {
      return { message: 'Service not found' };
    }
    await this.userServiceService.deleteService(+id);
    return { message: 'Service deleted successfully' };
  }
}
