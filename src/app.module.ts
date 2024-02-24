import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { FolderModule } from './folder/folder.module';
import { RowModule } from './row/row.module';

import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [FolderModule, RowModule, StatisticsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
