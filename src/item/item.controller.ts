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
    const items = await this.itemService.getAllItems();
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Items retrieved successfully',
      data: items,
    };
  }
  @Get(':id')
  async getItemById(@Param('id') id: number) {
    const item = await this.itemService.getItemById(+id);
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Item retrieved successfully',
      data: item,
    };
  }

  @Delete(':id')
  async deleteItem(@Param('id') id: number) {
    const item = await this.itemService.getItemById(+id);
    if (!item) {
      return { message: 'Item not found' };
    }
    await this.itemService.deleteItem(+id);
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Item deleted successfully',
    };
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
