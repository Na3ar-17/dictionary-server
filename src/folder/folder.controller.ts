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

  @Get('/get-all')
  async getFolders() {
    return this.folderService.getFolders();
  }

  @Get('/get-one/:folderId')
  async getOneFolder(@Param('folderId') folderId: string) {
    return this.folderService.getOneFolder(folderId);
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

  @Delete('/delete/:id')
  async deleteFolder(@Param('id') id: string) {
    return this.folderService.deleteFolder(id);
  }
}
