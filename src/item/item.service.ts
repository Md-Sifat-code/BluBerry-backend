import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';
import { ItemDto } from './item-dto/item-dto';

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}

  async getAllItems() {
    const items = await this.prisma.item.findMany();
    return items as ItemDto[];
  }

  async getItemById(id: number) {
    const item = await this.prisma.item.findUnique({ where: { id } });
    return item as ItemDto;
  }

  async deleteItem(id: number) {
    const item = await this.prisma.item.delete({ where: { id } });
    return item as ItemDto;
  }

  async createItem(itemData: Prisma.ItemCreateInput) {
    const result = await this.prisma.item.create({ data: itemData });
    return result as ItemDto;
  }
}
