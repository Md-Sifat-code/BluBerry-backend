import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

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
  }

 @Post('create')
@UseInterceptors(
  FilesInterceptor('files', 20, {
    storage: memoryStorage(),
  }),
)
async createItem(
  @UploadedFiles() files: Express.Multer.File[],
  @Body() body: any,
) {
  // body.contactData and body.itemsData are JSON strings from multipart form
  const contactDataStr = body.contactData;
  const itemsDataStr = body.itemsData;

  // Pass these strings along with files to the service
  const result = await this.itemService.createItem(contactDataStr, itemsDataStr, files);

  return {
    statusCode: HttpStatus.CREATED,
    success: true,
    message: 'Contact and Items created successfully',
    data: result,
  };
}

}
