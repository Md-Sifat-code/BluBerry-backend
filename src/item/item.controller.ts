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
    try {
      const items = await this.itemService.getAllItems();
      return {
        statusCode: HttpStatus.OK,
        success: true,
        message: 'Items retrieved successfully',
        data: items,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: 'Failed to retrieve items',
        error: error.message,
      };
    }
  }

  @Get(':id')
  async getItemById(@Param('id') id: number) {
    try {
      const item = await this.itemService.getItemById(+id);
      if (!item) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          success: false,
          message: 'Item not found',
        };
      }
      return {
        statusCode: HttpStatus.OK,
        success: true,
        message: 'Item retrieved successfully',
        data: item,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: 'Failed to retrieve item',
        error: error.message,
      };
    }
  }

  @Delete(':id')
  async deleteItem(@Param('id') id: number) {
    try {
      const item = await this.itemService.getItemById(+id);
      if (!item) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          success: false,
          message: 'Item not found',
        };
      }
      await this.itemService.deleteItem(+id);
      return {
        statusCode: HttpStatus.OK,
        success: true,
        message: 'Item deleted successfully',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: 'Failed to delete item',
        error: error.message,
      };
    }
  }

  @Post('create')
  async createItem(@Body() itemData: ItemDto) {
    try {
      const result = await this.itemService.createItem(itemData);
      return {
        statusCode: HttpStatus.CREATED,
        success: true,
        message: 'Item created successfully',
        data: result,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: 'Failed to create item',
        error: error.message,
      };
    }
  }
}
