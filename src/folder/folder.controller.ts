import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
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

  @Post('/create')
  async createFolder(@Body() dto: CreateFolderDto) {
    return this.folderService.createFolder(dto);
  }

  @Patch('/update')
  async editFolder(@Body() dto: CreateFolderDto) {
    return this.folderService.editFolder(dto);
  }

  @Delete('/delete/:id')
  async deleteFolder(@Param('id') id: string) {
    return this.folderService.deleteFolder(id);
  }
}
