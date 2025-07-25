import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UserService } from './review.service';
import { ReviewDTO } from './dto/reviewDto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('review')
  async createReview(@Body() reviewDto: ReviewDTO) {
    const result = await this.userService.createReview(reviewDto);
    return {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Review created successfully',
      data: result,
    };
  }
  @Get('review')
  async getReviews() {
    const result = await this.userService.getReviews();
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Reviews fetched successfully',
      data: result,
    };
  }

  @Get('review/:id')
  async getReview(@Body() id: number) {
    const result = await this.userService.getReview(id);
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Review fetched successfully',
      data: result,
    };
  }

  @Post('review/:id')
  async updateReview(@Body() id: number, @Body() reviewDto: ReviewDTO) {
    const result = await this.userService.updateReview(id, reviewDto);
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Review updated successfully done',
      data: result,
    };
  }

  @Delete('review/:id')
  async deleteReview(@Body() id: number) {
    const result = await this.userService.deleteReview(id);
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Review deleted successfully done',
      data: result,
    };
  }
}
