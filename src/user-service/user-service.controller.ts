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
    try {
      const result = await this.userServiceService.getAllServices();
      return {
        statusCode: HttpStatus.OK,
        success: true,
        message: 'Services retrieved successfully',
        data: result,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: 'Failed to retrieve services',
        error: error.message,
      };
    }
  }

  @Get(':id')
  async getServiceById(@Param('id') id: number) {
    try {
      const result = await this.userServiceService.getServiceById(+id);
      if (!result) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          success: false,
          message: 'Service not found',
        };
      }
      return {
        statusCode: HttpStatus.OK,
        success: true,
        message: 'Service retrieved successfully',
        data: result,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: 'Failed to retrieve service',
        error: error.message,
      };
    }
  }

  @Post('create')
  async createService(@Body() serviceData: UserServiceDto) {
    try {
      const result = await this.userServiceService.createService(serviceData);
      return {
        statusCode: HttpStatus.CREATED,
        success: true,
        message: 'Service created successfully',
        data: result,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: 'Failed to create service',
        error: error.message,
      };
    }
  }

  @Delete(':id')
  async deleteService(@Param('id') id: number) {
    try {
      const service = await this.userServiceService.getServiceById(+id);
      if (!service) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          success: false,
          message: 'Service not found',
        };
      }
      await this.userServiceService.deleteService(+id);
      return {
        statusCode: HttpStatus.OK,
        success: true,
        message: 'Service deleted successfully',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: 'Failed to delete service',
        error: error.message,
      };
    }
  }
}
