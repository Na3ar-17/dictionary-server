import { Module, forwardRef } from '@nestjs/common';
import { FolderService } from './folder.service';
import { FolderController } from './folder.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { StatisticsModule } from 'src/statistics/statistics.module';
import { RowModule } from 'src/row/row.module';
import { RowService } from 'src/row/row.service';

@Module({
  controllers: [FolderController],
  exports: [FolderService],
  imports: [PrismaModule, StatisticsModule, forwardRef(() => RowModule)],
  providers: [FolderService, RowService],
})
export class FolderModule {}
