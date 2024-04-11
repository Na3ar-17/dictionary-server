import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFolderDto } from './dto/folder.dto';
import { StatisticsService } from 'src/statistics/statistics.service';
import { stringToSlug } from 'src/utils/utils';

@Injectable()
export class FolderService {
  constructor(
    private prisma: PrismaService,
    private statisticsService: StatisticsService,
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
        createdAt: 'desc',
      },
    });
  }

  async createFolder(dto: CreateFolderDto) {
    const slug = stringToSlug(dto.title);

    const folders = await this.getFolders(dto.bookMarkId);

    await folders.forEach((el) => {
      if (el.title === dto.title) {
        throw new ConflictException('Title must be unique');
      }
    });

    const newFolder = this.prisma.folder.create({
      data: {
        title: dto.title,
        slug,
        bookMarkId: dto.bookMarkId,
      },
    });

    const newStatistics = await this.statisticsService.createStatistics(
      (await newFolder).id.toString(),
    );

    return newFolder;
  }

  async editFolder(dto: CreateFolderDto, folderId: string) {
    const folder = await this.getOne(folderId, dto.bookMarkId);
    const folders = await this.getFolders(dto.bookMarkId);

    await folders.forEach((el) => {
      if (el.title === dto.title) {
        throw new ConflictException('Title must be unique');
      }
    });

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
        id: folder.id,
      },
    });
  }
}
