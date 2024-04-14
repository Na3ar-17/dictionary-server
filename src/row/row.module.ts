import { Module, forwardRef } from '@nestjs/common';
import { RowService } from './row.service';
import { RowController } from './row.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FolderModule } from 'src/folder/folder.module';
import { StatisticsModule } from 'src/statistics/statistics.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { FolderService } from 'src/folder/folder.service';
import { StatisticsService } from 'src/statistics/statistics.service';

@Module({
  controllers: [RowController],
  exports: [RowService],
  imports: [PrismaModule, forwardRef(() => FolderModule), StatisticsModule],
  providers: [RowService, PrismaService, FolderService, StatisticsService],
})
export class RowModule {}
