import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFolderDto } from './dto/folder.dto';
import { StatisticsService } from 'src/statistics/statistics.service';
import { RowService } from 'src/row/row.service';

@Injectable()
export class FolderService {
  constructor(
    private prisma: PrismaService,
    private statisticsService: StatisticsService,
    private rowService: RowService,
  ) {}

  async getOne(id: string, bookMarkId: string) {
    const folder = this.prisma.folder.findUnique({
      where: {
        id,
        bookMarkId,
      },
    });

    if (!folder) {
      throw new NotFoundException("Folder doesn't exists");
    }

    return folder;
  }

  async getFolders(bookMarkId: string) {
    return this.prisma.folder.findMany({
      where: {
        bookMarkId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async createFolder(bookMarkId: string) {
    const newFolder = this.prisma.folder.create({
      data: {
        title: '',
        bookMark: {
          connect: {
            id: bookMarkId,
          },
        },
      },
    });

    const newStatistics = await this.statisticsService.createStatistics(
      (await newFolder).id,
    );

    return newFolder;
  }

  async editFolder(dto: CreateFolderDto, folderId: string) {
    const folder = await this.getOne(folderId, dto.bookMarkId);

    const newFolder = this.prisma.folder.update({
      where: {
        id: folderId,
      },
      data: {
        title: dto.title || folder.title,
      },
    });

    return newFolder;
  }

  async deleteFolder(folderId: string, bookMarkId: string) {
    const folder = await this.getOne(folderId, bookMarkId);

    const deletedStatistics =
      await this.statisticsService.deleteStatistics(folderId);

    const deletedFolder = await this.prisma.folder.delete({
      where: {
        id: folderId,
      },
    });
  }

  async deleteFolders(bookMarkId: string) {
    const deletedStatistics =
      await this.statisticsService.deleteMany(bookMarkId);

    // const deletedRows = await this.rowService.deleteAll(bookMarkId);
    const deletedFolders = await this.prisma.folder.deleteMany({
      where: {
        bookMark: {
          id: bookMarkId,
        },
      },
    });
  }
}
