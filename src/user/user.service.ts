import { Injectable } from '@nestjs/common';
import { Review } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}
  async createReview(reviewDto:Review){
      const result=await this.prisma.review.create({
        data:reviewDto
      })
      return result
  }
}
