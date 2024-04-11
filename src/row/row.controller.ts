import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RowService } from './row.service';
import { CreateRowDto } from './dto/row.dto';

@Controller('row')
export class RowController {
  constructor(private readonly rowService: RowService) {}

  @Get('/get-all/:folderId')
  async getRows(@Param('folderId') folderId: string) {
    return await this.rowService.getRows(folderId);
  }

  @Get('/get-random/:folderId')
  async getRandomRow(@Param('folderId') folderId: string) {
    return await this.rowService.getRandomRow(folderId);
  }

  @Get('/get-one/:folderId/:rowId')
  async getOneRow(
    @Param('folderId') folderId: string,
    @Param('rowId') rowId: string,
  ) {
    return await this.rowService.getOneRow(folderId, rowId);
  }

  @UsePipes(new ValidationPipe())
  @Post('/create')
  async createRow(
    @Body('folderId') folderId: string,
    @Body('bookMarkId') bookMarkId: string,
    @Body() dto: CreateRowDto,
  ) {
    return await this.rowService.createRow(folderId, bookMarkId, dto);
  }

  @Delete('/delete/:folderId/:rowId/:bookMarkId')
  async deleteRow(
    @Param('folderId') folderId: string,
    @Param('rowId') rowId: string,
    @Param('bookMarkId') bookMarkId: string,
  ) {
    return await this.rowService.deleteRow(folderId, rowId, bookMarkId);
  }

  @Put('/update')
  async updateRow(
    @Body('folderId') folderId: string,
    @Body('rowId') rowId: string,
    @Body() dto: CreateRowDto,
  ) {
    return await this.rowService.updateRow(folderId, rowId, dto);
  }
}
