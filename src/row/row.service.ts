import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRowDto } from './dto/row.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FolderService } from 'src/folder/folder.service';
import { StatisticsService } from 'src/statistics/statistics.service';

@Injectable()
export class RowService {
  constructor(
    private prisma: PrismaService,
    private folderService: FolderService,
    private statisticsService: StatisticsService,
  ) {}

  async findRow(folderId: string, rowId: string) {
    const row = await this.prisma.row.findUnique({
      where: {
        id: +rowId,
        folderId: +folderId,
      },
    });

    if (!row) {
      throw new NotFoundException("Row doesn't exists");
    }

    return row;
  }

  async getRandomRow(folderId: string) {
    const rows = await this.getRows(folderId);
    const indexes = rows.map((el) => el.id.toString());

    const randomIndex = Math.floor(Math.random() * indexes.length);

    const row = await this.getOneRow(folderId, indexes[randomIndex]);

    return row;
  }

  async getOneRow(folderId: string, rowId: string) {
    return await this.findRow(folderId, rowId);
  }

  async getRows(folderId: string) {
    return await this.prisma.row.findMany({
      where: {
        folderId: +folderId,
      },
    });
  }

  async createRow(folderId: string, dto: CreateRowDto) {
    const newRow = await this.prisma.row.create({
      data: {
        word: dto.word,
        translation: dto.translation,
        transcription: dto.transcription || 'empty',
        folderId: +folderId,
      },
    });

    const folder = await this.folderService.findFolder(folderId);

    const updatedFolder = await this.prisma.folder.update({
      where: {
        id: +folderId,
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

  async deleteRow(folderId: string, rowId: string) {
    const folder = await this.folderService.findFolder(folderId);

    const updatedFolder = await this.prisma.folder.update({
      where: {
        id: +folderId,
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
        id: +rowId,
        folderId: +folderId,
      },
    });

    return deletedRow;
  }

  async updateRow(folderId: string, rowId: string, dto: CreateRowDto) {
    const row = await this.findRow(folderId, rowId);

    return await this.prisma.row.update({
      where: {
        id: +rowId,
        folderId: +folderId,
      },
      data: {
        word: dto.word || row.word,
        translation: dto.translation || row.translation,
        transcription: dto.transcription || row.transcription,
      },
    });
  }
}
