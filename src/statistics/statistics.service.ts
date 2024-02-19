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

  async getAll() {
    return await this.prisma.statistics.findMany();
  }

  async createSession(folderId: string) {
    const newSession = await this.prisma.statistics.create({
      data: {
        folderId: +folderId,
      },
    });

    return newSession;
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
