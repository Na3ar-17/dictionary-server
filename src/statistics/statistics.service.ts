import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class StatisticsService {
  constructor(private prisma: PrismaService) {}

  async getStatistics(folderId: string) {
    const statistics = await this.prisma.statistics.findUnique({
      where: {
        folderId: +folderId,
      },
    });

    if (!statistics) {
      throw new NotFoundException(
        `statistics for folder with id: ${folderId} not found`,
      );
    }

    return statistics;
  }

  async createStatistics(folderId: string) {
    const newStatistics = await this.prisma.statistics.create({
      data: {
        folderId: +folderId,
        lastSession: new Date().toISOString(),
        createdAt: new Date(),
      },
    });

    return newStatistics;
  }

  async deleteStatistics(folderId: string) {
    const deletedStatistics = await this.prisma.statistics.delete({
      where: {
        folderId: +folderId,
      },
    });

    return deletedStatistics;
  }

  async endSession(folderId: string) {
    const statistics = await this.getStatistics(folderId);

    const endedSession = await this.prisma.statistics.update({
      where: {
        folderId: statistics.folderId,
      },
      data: {
        sessions: statistics.sessions + 1,
        lastSession: new Date().toISOString(),
      },
    });

    return endedSession;
  }

  async incrementCreatedRows(folderId: string) {
    const statistics = await this.getStatistics(folderId);
    const updatedCreatedRows = await this.prisma.statistics.update({
      where: {
        folderId: +folderId,
      },
      data: {
        createdRows: statistics.createdRows + 1,
      },
    });

    return updatedCreatedRows;
  }
  async incrementDeletedRows(folderId: string) {
    const statistics = await this.getStatistics(folderId);
    const updatedDeletedRows = await this.prisma.statistics.update({
      where: {
        folderId: +folderId,
      },
      data: {
        deletedRows: statistics.deletedRows + 1,
      },
    });

    return updatedDeletedRows;
  }

  async incrementRowsCount(folderId: string) {
    const statistics = await this.getStatistics(folderId);
    const updated = await this.prisma.statistics.update({
      where: {
        folderId: +folderId,
      },
      data: {
        rowsCount: statistics.rowsCount + 1,
      },
    });

    return updated;
  }

  async decrementRowsCount(folderId: string) {
    const statistics = await this.getStatistics(folderId);

    if (statistics.rowsCount > 0) {
      const updated = await this.prisma.statistics.update({
        where: {
          folderId: +folderId,
        },
        data: {
          rowsCount: statistics.rowsCount - 1,
        },
      });

      return updated;
    }
  }

  async getRowsCount(folderId: string) {
    const statistics = await this.getStatistics(folderId);

    return statistics.rowsCount;
  }
}
