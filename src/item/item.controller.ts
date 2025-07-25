import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemDto } from './item-dto/item-dto';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  async getAllItems() {
    return this.itemService.getAllItems();
  }
  @Get(':id')
  async getItemById(@Param('id') id: number) {
    return this.itemService.getItemById(+id);
  }

  @Delete(':id')
  async deleteItem(@Param('id') id: number) {
    const item = await this.itemService.getItemById(+id);
    if (!item) {
      return { message: 'Item not found' };
    }
    await this.itemService.deleteItem(+id);
    return { message: 'Item deleted successfully' };
  }

  @Post('create')
  async createItem(@Body() itemData: ItemDto) {
    const result = await this.itemService.createItem(itemData);
    return {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Item created successfully',
      data: result,
    };
  }
}
