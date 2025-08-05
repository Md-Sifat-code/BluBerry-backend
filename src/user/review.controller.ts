import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { ReviewDTO } from './dto/reviewDto';
import { UserService } from './review.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

// Create a new review
  @Post('review')
  async createReview(@Body() reviewDto: ReviewDTO) {
    try {
      const result = await this.userService.createReview(reviewDto);
      return {
        statusCode: HttpStatus.CREATED,
        success: true,
        message: 'Review created successfully',
        data: result,
      };
    } catch (error) {
      throw new HttpException(
        { success: false, message: 'Failed to create review' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Get all reviews
  @Get('review')
  async getReviews() {
    try {
      const result = await this.userService.getReviews();
      return {
        statusCode: HttpStatus.OK,
        success: true,
        message: 'Reviews fetched successfully',
        data: result,
      };
    } catch (error) {
      throw new HttpException(
        { success: false, message: 'Failed to fetch reviews' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Get a single review by ID
  @Get('review/:id')
  async getReview(@Param('id') id: string) {
    try {
      const result = await this.userService.getReview(+id);
      return {
        statusCode: HttpStatus.OK,
        success: true,
        message: 'Review fetched successfully',
        data: result,
      };
    } catch (error) {
      throw new HttpException(
        { success: false, message: 'Failed to fetch review' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Update a review by ID
  @Put('review/:id') // changed to PUT (more RESTful)
  async updateReview(
    @Param('id') id: string,
    @Body() reviewDto: ReviewDTO,
  ) {
    try {
      const result = await this.userService.updateReview(+id, reviewDto);
      return {
        statusCode: HttpStatus.OK,
        success: true,
        message: 'Review updated successfully',
        data: result,
      };
    } catch (error) {
      throw new HttpException(
        { success: false, message: 'Failed to update review' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Delete a review by ID
  @Delete('review/:id')
  async deleteReview(@Param('id') id: string) {
    try {
      const result = await this.userService.deleteReview(+id);
      return {
        statusCode: HttpStatus.OK,
        success: true,
        message: 'Review deleted successfully',
        data: result,
      };
    } catch (error) {
      throw new HttpException(
        { success: false, message: 'Failed to delete review' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
