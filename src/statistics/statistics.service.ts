import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class StatisticsService {
  constructor(private prisma: PrismaService) {}

  async getStatistics(folderId: string, statisticsId: string) {
    const statistics = await this.prisma.statistics.findUnique({
      where: {
        folderId: +folderId,
        id: +statisticsId,
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
      },
    });

    return newStatistics;
  }

  async deleteStatistics(folderId: string, statisticsId: string) {
    const deletedStatistics = await this.prisma.statistics.delete({
      where: {
        folderId: +folderId,
        id: +statisticsId,
      },
    });

    return deletedStatistics;
  }

  async getAll() {
    return await this.prisma.statistics.findMany();
  }

  async endSession(folderId: string, statisticsId: string) {
    const statistics = await this.getStatistics(folderId, statisticsId);

    const endedSession = await this.prisma.statistics.update({
      where: {
        folderId: statistics.folderId,
        id: statistics.id,
      },
      data: {
        sessions: statistics.sessions + 1,
      },
    });

    return endedSession;
  }
}
