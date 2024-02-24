import { Module } from '@nestjs/common';
import { FolderService } from './folder.service';
import { FolderController } from './folder.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { StatisticsService } from 'src/statistics/statistics.service';

@Module({
  controllers: [FolderController],
  providers: [FolderService, PrismaService, StatisticsService],
})
export class FolderModule {}
