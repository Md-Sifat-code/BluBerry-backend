import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from 'generated/prisma';

@Injectable()
<<<<<<< HEAD
export class PrismaService extends PrismaClient {
=======
export class PrismaService extends PrismaClient implements OnModuleInit {
>>>>>>> 6943b6fd93c28b3a2b58a5c4c46a99253ce85a92
  constructor(private config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }
<<<<<<< HEAD
=======

  async onModuleInit() {
    await this.$connect();
  }
>>>>>>> 6943b6fd93c28b3a2b58a5c4c46a99253ce85a92
}
