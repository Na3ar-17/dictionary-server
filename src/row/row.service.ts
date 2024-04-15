import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { CreateRowDto } from './dto/row.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FolderService } from 'src/folder/folder.service';
import { StatisticsService } from 'src/statistics/statistics.service';

@Injectable()
export class RowService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => FolderService))
    private folderService: FolderService,

    private statisticsService: StatisticsService,
  ) {}

  async findRow(folderId: string, rowId: string) {
    const row = await this.prisma.row.findUnique({
      where: {
        id: rowId,
        folderId: folderId,
      },
    });

    if (!row) {
      throw new NotFoundException("Row doesn't exists");
    }

    return row;
  }

  history = new Set();
  next;

  async getRandomRow(folderId: string) {
    const rows = await this.getRows(folderId);
    this.next = rows.length;

    this.shuffleArray(rows);

    for (const row of rows) {
      if (!this.history.has(row.id)) {
        this.history.add(row.id);
        this.next -= this.history.size;
        const res = {
          ...row,
          next: this.next,
        };
        return res;
      }
    }

    this.history.clear();
    return [];
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  async getOneRow(folderId: string, rowId: string) {
    return await this.findRow(folderId, rowId);
  }

  async getRows(folderId: string) {
    return await this.prisma.row.findMany({
      where: {
        folderId: folderId,
      },
      orderBy: [{ createdAt: 'desc' }],
    });
  }

  async createRow(folderId: string, bookMarkId: string) {
    const newRow = await this.prisma.row.create({
      data: {
        word: '',
        translation: '',
        transcription: '',
        bookMarkId: bookMarkId,
        folder: {
          connect: {
            id: folderId,
          },
        },
      },
    });

    const folder = await this.folderService.getOne(folderId, bookMarkId);

    const updatedFolder = await this.prisma.folder.update({
      where: {
        id: folderId,
      },
      data: {
        itemsCount: folder.itemsCount + 1,
      },
    });

    const updateCreatedRows =
      await this.statisticsService.incrementCreatedRows(folderId);

    const updateRowsCount =
      await this.statisticsService.incrementRowsCount(folderId);

    return newRow;
  }

  async tmp(folderId: string, bookMarkId: string) {
    const folder = await this.folderService.getOne(folderId, bookMarkId);

    const updatedFolder = await this.prisma.folder.update({
      where: {
        id: folder.id,
      },
      data: {
        itemsCount: 1,
      },
    });

    return updatedFolder;
  }

  async deleteRow(folderId: string, rowId: string, bookMarkId: string) {
    const folder = await this.folderService.getOne(folderId, bookMarkId);

    const updatedFolder = await this.prisma.folder.update({
      where: {
        id: folderId,
      },
      data: {
        itemsCount: folder.itemsCount - 1,
      },
    });

    const updatedDeletedRows =
      await this.statisticsService.incrementDeletedRows(folderId);

    const updatedWordsCount =
      await this.statisticsService.decrementRowsCount(folderId);

    const deletedRow = await this.prisma.row.delete({
      where: {
        id: rowId,
        folderId: folderId,
      },
    });
  }

  async updateRow(folderId: string, rowId: string, dto: CreateRowDto) {
    const row = await this.findRow(folderId, rowId);

    return await this.prisma.row.update({
      where: {
        id: rowId,
        folderId: folderId,
      },
      data: {
        word: dto.word || row.word,
        translation: dto.translation || row.translation,
        transcription: dto.transcription,
      },
    });
  }

  async deleteAll(bookMarkId: string) {
    return await this.prisma.row.deleteMany({
      where: {
        bookMarkId: bookMarkId,
      },
    });
  }
}
