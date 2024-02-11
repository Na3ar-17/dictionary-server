import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
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
    @Body() dto: CreateRowDto,
  ) {
    return await this.rowService.createRow(folderId, dto);
  }

  @UsePipes(new ValidationPipe())
  @Delete('/delete/:folderId/:rowId')
  async deleteRow(
    @Param('folderId') folderId: string,
    @Param('rowId') rowId: string,
  ) {
    return await this.rowService.deleteRow(folderId, rowId);
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
