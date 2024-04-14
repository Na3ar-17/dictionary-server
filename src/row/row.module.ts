import { Module } from '@nestjs/common';
import { RowService } from './row.service';
import { RowController } from './row.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { StatisticsService } from 'src/statistics/statistics.service';
import { BookMarkService } from 'src/book-mark/book-mark.service';

@Module({
  controllers: [RowController],
  providers: [RowService, PrismaService, StatisticsService, BookMarkService],
})
export class RowModule {}
