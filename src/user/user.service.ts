import { Injectable } from '@nestjs/common';
import ReviewDTO from './DTOs/user-dto';

@Injectable()
export class UserService {
  findAll() {
    return `This action returns all users`;
  }

  createReview(reviewData: ReviewDTO) {
    return reviewData;
  }
}
