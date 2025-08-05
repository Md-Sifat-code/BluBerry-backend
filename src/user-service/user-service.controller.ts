import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { UserServiceService } from './user-service.service';
import { UserServiceDto } from './user-service-dto/user-service-dto';

@Controller('user-service')
export class UserServiceController {
  constructor(private readonly userServiceService: UserServiceService) {}

  @Get()
  async getAllServices() {
    const result = await this.userServiceService.getAllServices();
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Services retrieved successfully',
      data: result,
    };
  }

  @Get(':id')
  async getServiceById(@Param('id') id: number) {
    const result = await this.userServiceService.getServiceById(+id);
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Service retrieved successfully',
      data: result,
    };
  }

  @Post('create')
  async createService(@Body() serviceData: UserServiceDto) {
    const result = await this.userServiceService.createService(serviceData);
    return {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Service created successfully',
      data: result,
    };
  }

  @Delete(':id')
  async deleteService(@Param('id') id: number) {
    const service = await this.userServiceService.getServiceById(+id);
    if (!service) {
      return { message: 'Service not found' };
    }
    await this.userServiceService.deleteService(+id);
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Service deleted successfully',
    };
  }
}
