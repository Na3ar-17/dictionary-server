import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFolderDto } from './dto/folder.dto';
import { StatisticsService } from 'src/statistics/statistics.service';

@Injectable()
export class FolderService {
  constructor(
    private prisma: PrismaService,
    private statisticsService: StatisticsService,
  ) {}

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

    const newStatistics = await this.statisticsService.createStatistics(
      (await newFolder).id.toString(),
    );

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

  async deleteFolder(folderId: string) {
    const folder = await this.findFolder(folderId);
    const deletedStatistics =
      await this.statisticsService.deleteStatistics(folderId);

    const deletedFolder = await this.prisma.folder.delete({
      where: {
        id: folder.id,
      },
    });

    return deletedFolder;
  }
}
