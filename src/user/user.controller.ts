import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ReviewDTO } from './dto/reviewDto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('review')
  async createReview(@Body() reviewDto:ReviewDTO){
     const result=await this.userService.createReview(reviewDto)
     return{
      statusCode:HttpStatus.CREATED,
      success:true,
      message:"Review created successfully",
      data:result
     }
  }
}
