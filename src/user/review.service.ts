import { Injectable } from '@nestjs/common';
import { Review } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async createReview(reviewDto: Review) {
    const result = await this.prisma.review.create({
      data: reviewDto,
    });
    return result;
  }

  async getReviews() {
    const result = await this.prisma.review.findMany();
    return result;
  }

  async getReview(id: number) {
    const result = await this.prisma.review.findUnique({
      where: {
        id: id,
      },
    });
    return result;
  }

  async updateReview(id: number, reviewDto: Review) {
    const result = await this.prisma.review.update({
      where: {
        id: id,
      },
      data: reviewDto,
    });
    return result;
  }

  async deleteReview(id: number) {
    const result = await this.prisma.review.delete({
      where: {
        id: id,
      },
    });
    return result;
  }
}
