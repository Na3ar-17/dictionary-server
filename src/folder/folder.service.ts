import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFolderDto } from './dto/folder.dto';

@Injectable()
export class FolderService {
  constructor(private prisma: PrismaService) {}

  async findFolder(id: string) {
    const folder = this.prisma.folder.findUnique({
      where: {
        id: +id,
      },
    });

    if (!folder) {
      throw new NotFoundException("Folder doesn't exists");
    }

    return folder;
  }

  async getFolders() {
    return this.prisma.folder.findMany();
  }

  async getOneFolder(folderId: string) {
    const folder = await this.findFolder(folderId);
    return folder;
  }

  async createFolder(dto: CreateFolderDto) {
    const newFolder = this.prisma.folder.create({
      data: {
        title: dto.title,
      },
    });

    return newFolder;
  }

  async editFolder(dto: CreateFolderDto, id: string) {
    const folder = await this.findFolder(id);

    const newFolder = this.prisma.folder.update({
      where: {
        id: +id,
      },
      data: {
        title: dto.title || folder.title,
      },
    });

    return newFolder;
  }

  async deleteFolder(id: string) {
    const folder = await this.findFolder(id);

    return this.prisma.folder.delete({
      where: {
        id: folder.id,
      },
    });
  }
}
