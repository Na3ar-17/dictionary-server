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
import { FolderService } from './folder.service';
import { CreateFolderDto } from './dto/folder.dto';

@Controller('folder')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @Get('/:bookMarkId')
  async getFolders(@Param('bookMarkId') bookMarkId: string) {
    return this.folderService.getFolders(bookMarkId);
  }

  @Get('/get-one/:folderId/:bookMarkId')
  async getOne(
    @Param('folderId') folderId: string,
    @Param('bookMarkId') bookMarkId: string,
  ) {
    return this.folderService.getOne(folderId, bookMarkId);
  }

  @UsePipes(new ValidationPipe())
  @Post('/create')
  async createFolder(@Body() dto: CreateFolderDto) {
    return this.folderService.createFolder(dto);
  }

  @UsePipes(new ValidationPipe())
  @Put('/update/:id')
  async editFolder(@Body() dto: CreateFolderDto, @Param('id') id: string) {
    return this.folderService.editFolder(dto, id);
  }

  @Delete('/delete/:id/:bookMarkId')
  async deleteFolder(
    @Param('id') id: string,
    @Param('bookMarkId') bookMarkId: string,
  ) {
    return this.folderService.deleteFolder(id, bookMarkId);
  }
}
