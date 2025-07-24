import { Injectable } from '@nestjs/common';
import { Review, Prisma, PrismaClient } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async createReview(reviewDto: Prisma.ReviewCreateInput): Promise<Review> {
    const result = await (this.prisma as PrismaClient).review.create({
      data: reviewDto,
    });

    return result;
  }
}
