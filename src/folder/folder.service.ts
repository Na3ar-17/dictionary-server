import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFolderDto } from './dto/folder.dto';

@Injectable()
export class FolderService {
  constructor(private prisma: PrismaService) {}

  async findFolder(id: string) {
    return this.prisma.folder.findUnique({
      where: {
        id: +id,
      },
    });
  }

  async getFolders() {
    return this.prisma.folder.findMany();
  }

  async getOneFolder(folderId: string) {
    return await this.prisma.folder.findUnique({
      where: {
        id: +folderId,
      },
    });
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
    if (!id) {
      throw new ConflictException('Id is undefined');
    }

    if (!folder) {
      throw new ConflictException("folder doesn't exists");
    }

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

    if (!folder) {
      throw new ConflictException("folder doesn't exists");
    }

    return this.prisma.folder.delete({
      where: {
        id: folder.id,
      },
    });
  }
}
