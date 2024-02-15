import { ConflictException, Injectable } from '@nestjs/common';
import { CreateRowDto } from './dto/row.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FolderService } from 'src/folder/folder.service';
import { OpenaiService } from 'src/openai/openai.service';

@Injectable()
export class RowService {
  constructor(
    private prisma: PrismaService,
    private folderService: FolderService,
    private openaiService: OpenaiService,
  ) {}

  async findRow(folderId: string, rowId: string) {
    if (!rowId || !folderId) throw new ConflictException('id is undefined');
    return await this.prisma.row.findUnique({
      where: {
        id: +rowId,
        folderId: +folderId,
      },
    });
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
        word: dto.word !== '' ? dto.word : 'empty',
        translation: dto.translation !== '' ? dto.translation : 'empty',
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

    return newRow;
  }

  async deleteRow(folderId: string, rowId: string) {
    const row = await this.findRow(folderId, rowId);

    if (!row) {
      throw new ConflictException("Row doesn't exists");
    }

    const folder = await this.folderService.findFolder(folderId);

    const updatedFolder = await this.prisma.folder.update({
      where: {
        id: +folderId,
      },
      data: {
        itemsCount: folder.itemsCount - 1,
      },
    });

    return await this.prisma.row.delete({
      where: {
        id: +rowId,
        folderId: +folderId,
      },
    });
  }

  async updateRow(folderId: string, rowId: string, dto: CreateRowDto) {
    const row = await this.findRow(folderId, rowId);

    if (!row) {
      throw new ConflictException("Row doesn't exists");
    }

    return await this.prisma.row.update({
      where: {
        id: +rowId,
        folderId: +folderId,
      },
      data: {
        word: dto.word || row.word,
        translation: dto.translation || row.translation,
      },
    });
  }
}
