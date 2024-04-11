import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BookMarkService } from './book-mark.service';
import { BookMarkDTO } from './dto/bookMark.dto';

@Controller('book-mark')
export class BookMarkController {
  constructor(private readonly bookMarkService: BookMarkService) {}

  @Get('')
  async getAll() {
    return await this.bookMarkService.getAll();
  }

  @UsePipes(new ValidationPipe())
  @Post('/create')
  async create(@Body() dto: BookMarkDTO) {
    return await this.bookMarkService.create(dto);
  }

  @UsePipes(new ValidationPipe())
  @Put('/update/:id')
  async update(@Body() dto: BookMarkDTO, @Param('id') id: string) {
    return await this.bookMarkService.update(id, dto);
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: string) {
    return await this.bookMarkService.delete(id);
  }
}
