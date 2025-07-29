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
import { ItemDto } from './item-dto/item-dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
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
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './files',
        filename: (req, file, cb) => {
          cb(null, `${Date.now()}-${file.originalname}`);
        },
      }),
    }),
  )
  async createItem(
    @Body() itemData: ItemDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const result = await this.itemService.createItem(itemData);
    return {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Item created successfully',
      data: result,
      uploadedFiles: files,
    };
  }
}
