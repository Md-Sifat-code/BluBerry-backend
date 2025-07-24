import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import ReviewDTO from './DTOs/user-dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post('create-review')
  createReview(@Body() reviewData: ReviewDTO) {
    return this.userService.createReview(reviewData);
  }
}
